import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { newUserDto } from './auth.controller';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import jwt from 'src/config/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async signUp(user: newUserDto) {
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
      this.mailService.sendNewUserEmail(user);
      this.mailService.sendEmailToNewUser(user);
      return this.signIn(user.username, user.password);
    }
  }

  async checkPasswordAndCreateAccessToken(pass: string, user) {
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user === null) {
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
    };
  }

  async deleteUser(id: number) {
    return await this.usersService.deleteUser(id);
  }

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
      throw new UnauthorizedException();
    }
  }
}
