import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { AlumniDto, NewUserDto } from './auth.controller';
import { Logger } from 'nestjs-pino';
import { ReviewService } from 'src/review/review.service';
import { SpeakersService } from 'src/speakers/speakers.service';
import { Speaker } from 'src/speakers/entities/speaker.entity';
import { AlumniService } from 'src/alumni/alumni.service';
import { WorkshopsService } from 'src/workshops/workshops.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private reviewService: ReviewService,
    private speakersService: SpeakersService,
    private alumniService: AlumniService,
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
      // this.logger.error('User does not exist', username);
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await this.verifyPasswordMatches(pass, user);

    if (isCorrectPassword) {
      return this.createAccessToken(user);
    } else {
      // this.logger.error('Unauthorized: Incorrect password', user.username);
      throw new UnauthorizedException();
    }
  }

  async getUserProfile(id: number) {
    const user = await this.usersService.findOneById(id);

    // this.logger.log(user.username + ' viewed their profile');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
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

    this.logger.log(user.username + ' changed ' + field);

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

    return 'deleted';
  }

  // create password reset JWT
  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      // this.logger.error('User doe not exist', email);
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
      // this.logger.error(
      //   'Unauthorized - Password reset link expired',
      //   user.username,
      // );
      throw new UnauthorizedException();
    }
  }

  async uploadFile(id, file) {
    return await this.usersService.uploadFile(id, file);
  }

  async submitReview(review) {
    return await this.reviewService.submitReview(review);
  }

  async createSpeaker(speaker: Speaker) {
    return await this.speakersService.createSpeaker(speaker);
  }

  async getSpeakers() {
    return await this.speakersService.findAllSpeakers();
  }

  async createAlumni(alumni: AlumniDto) {
    return await this.alumniService.createAlumni(alumni);
  }
}
