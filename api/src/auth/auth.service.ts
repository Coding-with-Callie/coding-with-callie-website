import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { DeliverableDto, FeedbackDto, NewUserDto } from './auth.controller';
import { Logger } from 'nestjs-pino';
import { ReviewService } from 'src/review/review.service';
import { SpeakersService } from 'src/speakers/speakers.service';
import { Speaker } from 'src/speakers/entities/speaker.entity';
import { CartService } from 'src/cart/cart.service';
import { WorkshopsService } from 'src/workshops/workshops.service';
import { Workshop } from 'src/workshops/content/type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51OnUh9GPYyWkM7JWnPIpLMhkYb21iJSB6ZHLm82ua0YTvTa7nj9AleXdx2KBb5Gn5tFRjzE4DxEgbEdeYJObDJDj00CU7eZaJQ',
);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private submissionsService: SubmissionsService,
    private feedbackService: FeedbackService,
    private reviewService: ReviewService,
    private speakersService: SpeakersService,
    private cartService: CartService,
    private workshopsService: WorkshopsService,
    private logger: Logger,
  ) {}

  async hashPassword(password) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async signUp(user: NewUserDto) {
    const existingUsername = await this.usersService.findOneByUsername(
      user.username,
    );

    const existingEmail = await this.usersService.findOneByEmail(user.email);

    if (existingUsername !== null) {
      return 'user already exists';
    } else if (existingEmail !== null) {
      return 'email already exists';
    } else {
      const hashedPassword = await this.hashPassword(user.password);
      await this.usersService.createUser({
        name: user.name,
        email: user.email,
        username: user.username,
        password: hashedPassword,
      });
      this.logger.log('New user created', user.username);
      this.mailService.sendNewUserEmail(user);
      this.mailService.sendEmailToNewUser(user);
      return this.signIn(user.username, user.password);
    }
  }

  async verifyPasswordMatches(pass: string, user) {
    return await bcrypt.compare(pass, user.password);
  }

  async createAccessToken(user) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    this.logger.log('User logged in', user.username);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user === null) {
      this.logger.error('User does not exist', username);
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await this.verifyPasswordMatches(pass, user);

    if (isCorrectPassword) {
      return this.createAccessToken(user);
    } else {
      this.logger.error('Unauthorized: Incorrect password', user.username);
      throw new UnauthorizedException();
    }
  }

  async getAdminData() {
    const users = await this.usersService.findAllUsers();

    const workshops = await this.workshopsService.findAll();

    const adminData = [];

    for (let i = 0; i < workshops.length; i++) {
      const workshopStats = {};

      workshopStats['name'] = workshops[i].name;
      workshopStats['submissionCount'] =
        await this.submissionsService.getSubmissionsCountBySession(
          workshops[i].id,
        );
      workshopStats['feedbackCount'] =
        await this.feedbackService.getFeedbackCountBySession();
      workshopStats['reviewCount'] = (
        await this.reviewService.getAllReviews(workshops[i].id)
      ).length;

      adminData.push(workshopStats);
    }

    const reviewCount = (await this.reviewService.getAllReviews()).length;

    return { users, reviewCount, adminData };
  }

  async getUserProfile(id: number) {
    const user = await this.usersService.findOneById(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      submissions: user.submissions,
      feedback: user.feedback,
      photo: user.photo,
      cart: user.cart,
      workshops: user.workshops,
    };
  }

  async getWorkshopResources(workshopId: number, userId: number) {
    const user = await this.usersService.findOneById(userId);

    const workshop = user.workshops.find(
      (workshop) => workshop.id === workshopId,
    );

    if (!workshop) {
      throw new NotFoundException('workshop not found');
    }

    return {
      workshop,
      submissions: user.submissions,
    };
  }

  async getMyWorkshops(userId: number) {
    const user = await this.usersService.findOneById(userId);

    if (user.workshops.length === 0) {
      throw new NotFoundException('no workshops found');
    }

    return user.workshops;
  }

  async changeAccountDetail(id: number, value: string, field: string) {
    const userToUpdate = await this.usersService.findOneById(id);

    if (field === 'password') {
      value = await this.hashPassword(value);
    }

    const user = await this.usersService.changeAccountDetail(
      userToUpdate,
      field,
      value,
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      submissions: user.submissions,
      feedback: user.feedback,
      photo: user.photo,
    };
  }

  async deleteUser(id: number) {
    const user = await this.usersService.findOneById(id);

    await this.usersService.changeAccountDetail(user, 'name', 'deleted');
    await this.usersService.changeAccountDetail(
      user,
      'username',
      `deleted-${Date.now()}`,
    );
    await this.usersService.changeAccountDetail(user, 'email', 'deleted');
    await this.usersService.changeAccountDetail(user, 'password', 'deleted');

    const submissions = user.submissions;

    submissions.forEach(async (submission) => {
      await this.editDeliverable({
        session: submission.session,
        user: { id: user.id },
        url: 'This submission was deleted.',
      });
    });

    return 'deleted';
  }

  // create password reset JWT
  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      this.logger.error('User doe not exist', email);
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const secret = user.password;
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '10m',
    });

    return await this.mailService.sendPasswordResetEmail(
      user,
      access_token,
      user.id,
    );
  }

  // check password reset token
  async getProfileReset(token, id) {
    const user = await this.usersService.findOneById(id);
    const payload = await this.jwtService.verifyAsync(token, {
      secret: user.password,
    });

    if (payload) {
      return await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      });
    } else {
      this.logger.error(
        'Unauthorized - Password reset link expired',
        user.username,
      );
      throw new UnauthorizedException();
    }
  }

  async getSolutionVideos(workshopId, id) {
    const workshop = await this.workshopsService.findOneById(workshopId);

    const session = workshop.sessions[id - 1];
    session['id'] = id;

    return session;
  }

  async getUserSubmissions(userId: number) {
    return await this.submissionsService.getUserSubmissions(userId);
  }

  async getAllSubmissions(workshopId, sessionId, userId) {
    const submissions = await this.submissionsService.getAllSubmissions(
      workshopId,
      sessionId,
    );

    const userSubmissions = submissions.filter((submission) => {
      return submission.user.id === userId;
    });

    if (submissions.length === 0) {
      throw new NotFoundException('No submissions found');
    }

    if (userSubmissions.length === 0) {
      throw new UnauthorizedException(
        'You have not submitted the deliverable for this session yet!',
      );
    }

    const user = await this.usersService.findOneById(userId);
    return { role: user.role, submissions };
  }

  async submitDeliverable(deliverable: DeliverableDto, user: any) {
    this.mailService.sendNewSubmissionEmail({
      session: deliverable.session,
      url: deliverable.url,
      user,
      videoDate: deliverable.videoDate,
    });
    return await this.submissionsService.submitDeliverable(deliverable);
  }

  async editDeliverable(deliverable: any) {
    return await this.submissionsService.editDeliverable(deliverable);
  }

  async submitFeedback(feedbackDto: FeedbackDto) {
    const user = await this.submissionsService.getUserWithSubmissionId(
      feedbackDto.submissionId,
    );

    const submission = await this.submissionsService.getSubmissionWithId(
      feedbackDto.submissionId,
    );

    const feedbackProvider = await this.usersService.findOneById(
      feedbackDto.feedbackProviderId,
    );

    this.mailService.sendFeedbackEmail({
      user: user[0].user,
      feedbackProvider: feedbackProvider.username,
      session: feedbackDto.sessionId,
      positiveFeedback: feedbackDto.positiveFeedback,
      immediateChangesRequested: feedbackDto.immediateChangesRequested,
      longTermChangesRequested: feedbackDto.longTermChangesRequested,
    });

    this.mailService.sendNewFeedbackGivenEmail({
      feedbackReceiver: user[0].user.username,
      session: feedbackDto.sessionId,
      url: submission[0].url,
      feedbackProvider: feedbackProvider,
    });

    return await this.feedbackService.submitFeedback(feedbackDto);
  }

  async editFeedback(feedbackDto: any) {
    return await this.feedbackService.editFeedback(feedbackDto);
  }

  async uploadFile(id, file) {
    return await this.usersService.uploadFile(id, file);
  }

  async submitReview(review) {
    const existingReview = await this.reviewService.findReview(
      review.userId,
      review.session,
    );
    if (existingReview.length > 0) {
      return await this.reviewService.getAllReviews();
    } else {
      const workshop = await this.workshopsService.findOneById(
        review.workshopId,
      );
      return await this.reviewService.submitReview(review, workshop);
    }
  }

  async createSpeaker(speaker: Speaker) {
    return await this.speakersService.createSpeaker(speaker);
  }

  async getSpeakers() {
    return await this.speakersService.findAllSpeakers();
  }

  async createCheckoutSession(lineItems: any[], userId: number) {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      metadata: {
        user: userId,
      },
    });

    return { clientSecret: session.client_secret };
  }

  async getSessionStatus(session_id, userId) {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status === 'complete') {
      let lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      lineItems = lineItems.data;

      for (let i = 0; i < lineItems.length; i++) {
        const workshop = await this.workshopsService.findOneByPriceId(
          lineItems[i].price.id,
        );

        const userToUpdate = await this.usersService.findOneById(userId);

        userToUpdate.workshops = [...userToUpdate.workshops, workshop];

        await this.usersService.createUser(userToUpdate);

        await this.deleteWorkshopFromCart(workshop.id, userToUpdate.id);
      }
    }

    return {
      status: session.status,
      customer_email: await stripe.checkout.sessions.retrieve(session_id),
    };
  }

  async receiveWebhook(data) {
    if (data.type === 'checkout.session.completed') {
      const userId = data.data.object.metadata.user;
      let lineItems = await stripe.checkout.sessions.listLineItems(
        data.data.object.id,
      );

      lineItems = lineItems.data;

      for (let i = 0; i < lineItems.length; i++) {
        const workshop = await this.workshopsService.findOneByPriceId(
          lineItems[i].price.id,
        );
        const userToUpdate = await this.usersService.findOneById(userId);
        userToUpdate.workshops = [...userToUpdate.workshops, workshop];

        await this.usersService.createUser(userToUpdate);

        await this.deleteWorkshopFromCart(workshop.id, userToUpdate.id);
      }
    }
  }

  async addWorkshopToCart(workshopId: number, userId: number) {
    const user = await this.usersService.findOneById(userId);
    let cartId: number;

    if (!user.cart) {
      cartId = await this.cartService.createCart(userId);
    } else {
      cartId = user.cart.id;
    }

    const cart = await this.cartService.addWorkshopToCart(workshopId, cartId);
    user.cart = cart;
    const updatedUser = await this.usersService.createUser(user);
    return updatedUser;
  }

  async deleteWorkshopFromCart(workshopId: number, userId: number) {
    const user = await this.usersService.findOneById(userId);
    const workshops = user.cart.workshops;

    const workshopToDelete = workshops.find(
      (workshop) => workshop.id === workshopId,
    );

    const index = workshops.indexOf(workshopToDelete);
    workshops.splice(index, 1);

    await this.cartService.updateCart(workshops, user.cart.id);

    const updatedUser = await this.usersService.findOneById(userId);

    return updatedUser;
  }

  async createWorkshop(workshop: Workshop) {
    return await this.workshopsService.createWorkshop(workshop);
  }
}
