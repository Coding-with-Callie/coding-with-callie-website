import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { FeedbackService } from 'src/feedback/feedback.service';
import { NewUserDto } from './auth.controller';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private submissionsService: SubmissionsService,
    private feedbackService: FeedbackService,
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

  async checkPasswordAndCreateAccessToken(pass: string, user) {
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      this.logger.error('Unauthorized: Incorrect password', user.username);
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
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

    return this.checkPasswordAndCreateAccessToken(pass, user);
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
    };
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

  async getUserSubmissions(userId: number) {
    return await this.submissionsService.getUserSubmissions(userId);
  }

  async getAllSubmissions(sessionId) {
    return await this.submissionsService.getAllSubmissions(sessionId);
  }

  async submitDeliverable(deliverable: any) {
    return await this.submissionsService.submitDeliverable(deliverable);
  }

  async editDeliverable(deliverable: any) {
    return await this.submissionsService.editDeliverable(deliverable);
  }

  async submitFeedback(feedbackDto: any) {
    return await this.feedbackService.submitFeedback(feedbackDto);
  }

  async editFeedback(feedbackDto: any) {
    return await this.feedbackService.editFeedback(feedbackDto);
  }

  async uploadFile(id, file) {
    return await this.usersService.uploadFile(id, file);
  }
}
