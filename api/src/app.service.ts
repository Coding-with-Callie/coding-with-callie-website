import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WorkshopsService } from './workshops/workshops.service';
import { AlumniService } from './alumni/alumni.service';
import { ResourceService } from './resource/resource.service';
import { SpeakersService } from './speakers/speakers.service';
import { hashPassword, verifyPasswordMatches } from './helpers/helpers';
import { UsersService } from './users/users.service';
import { MailService } from './mail/mail.service';
import { NewUserDto } from './app.controller';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly resourceService: ResourceService,
    private readonly workshopsService: WorkshopsService,
    private readonly alumniService: AlumniService,
    private readonly speakersService: SpeakersService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async getAllResources() {
    return await this.resourceService.getResources();
  }

  async getAllWorkshops() {
    return await this.workshopsService.findAll();
  }

  async getAllAlumni() {
    return await this.alumniService.findAllAlumni();
  }

  async getAllSpeakers() {
    return await this.speakersService.findAllSpeakers();
  }

  async signUp(user: NewUserDto, photoUrl: string) {
    const existingUsername = await this.usersService.findOneByUsername(
      user.username,
    );

    const existingEmail = await this.usersService.findOneByEmail(user.email);

    if (existingUsername !== null) {
      return 'user already exists';
    } else if (existingEmail !== null) {
      return 'email already exists';
    } else {
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
  }

  async createAccessToken(user) {
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
}
