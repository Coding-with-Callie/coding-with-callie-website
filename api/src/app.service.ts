import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
  async getRoutes() {
    return [
      {
        path: '/',
        page: 'Home',
        loader: 'resources',
      },
    ];
  }

  async getAllResources() {
    return await this.resourceService.getResources();
  }

  async getAllWorkshops() {
    return await this.workshopsService.getWorkshops();
  }

  async getAllSpeakers() {
    return await this.speakersService.getSpeakers();
  }

  async registerUserAndLogIn(user: NewUserDto, photoUrl: string) {
    // Register user
    await this.signUp(user, photoUrl);

    // Log in user
    return await this.logIn(user.username, user.password);
  }

  async signUp(user: NewUserDto, photoUrl: string) {
    // Check if username or email exists in database
    if (
      (await this.usersService.checkIfUsernameExists(user.username)) ||
      (await this.usersService.checkIfEmailExists(user.email))
    ) {
      throw new BadRequestException('user already exists');
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

  async sendPasswordResetEmail(email: string) {
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

    await this.mailService.sendPasswordResetEmail(
      user.email,
      access_token,
      user.id,
    );
    return { message: 'Password reset email sent' };
  }

  async getLongTermToken(token: string, id: number) {
    const user = await this.usersService.getUser(id);

    try {
      await this.jwtService.verifyAsync(token, {
        secret: user.password,
      });
    } catch (error) {
      throw new UnauthorizedException();
    } finally {
      return await this.jwtService.signAsync(
        {
          sub: id,
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
