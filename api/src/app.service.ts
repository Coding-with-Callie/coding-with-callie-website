import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WorkshopsService } from './workshops/workshops.service';
import { ResourceService } from './resource/resource.service';
import { SpeakersService } from './speakers/speakers.service';
import { hashPassword, verifyPasswordMatches } from './helpers/helpers';
import { UsersService } from './users/users.service';
import { MailService } from './mail/mail.service';
import { NewUserDto } from './app.controller';
import { JwtService } from '@nestjs/jwt';
import { Users } from './users/entities/users.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly resourceService: ResourceService,
    private readonly workshopsService: WorkshopsService,
    private readonly speakersService: SpeakersService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async getAllResources() {
    return await this.resourceService.getResources();
  }

  async getAllWorkshops() {
    return await this.workshopsService.getWorkshops();
  }

  async getAllSpeakers() {
    return await this.speakersService.getSpeakers();
  }

  async signUp(user: NewUserDto, photoUrl: string) {
    // Check if username exists in database
    if (await this.usersService.checkIfUsernameExists(user.username)) {
      return 'user already exists';
    }

    // Check if email exists in database
    if (await this.usersService.checkIfEmailExists(user.email)) {
      return 'email already exists';
    }

    // Otherwise, create user
    const hashedPassword = await hashPassword(user.password);

    await this.usersService.createUser({
      name: user.name,
      email: user.email,
      username: user.username,
      password: hashedPassword,
      photo: photoUrl,
    });

    this.mailService.sendNewUserEmail(user);
    this.mailService.sendEmailToNewUser(user);
    return { message: 'User created' };
  }

  async createAccessToken(user: Users) {
    const payload = { sub: user.id, username: user.username, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h',
      }),
    };
  }

  async logIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user === null) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await verifyPasswordMatches(pass, user);

    if (isCorrectPassword) {
      return this.createAccessToken(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  // create password reset JWT
  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const secret = user.password;
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '10m',
    });

    await this.mailService.sendPasswordResetEmail(user, access_token, user.id);
    return { message: 'Password reset email sent' };
  }

  // check password reset token
  async getProfileReset(token, id) {
    const user = await this.usersService.findOneById(id);

    try {
      await this.jwtService.verifyAsync(token, {
        secret: user.password,
      });
    } catch (error) {
      throw new UnauthorizedException();
    } finally {
      return await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '24h',
        },
      );
    }
  }
}
