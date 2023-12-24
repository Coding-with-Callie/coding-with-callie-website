import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { newUserDto } from './auth.controller';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(user: newUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    await this.usersService.createUser({
      name: user.name,
      email: user.email,
      username: user.username,
      password: hashedPassword,
    });
    return this.signIn(user.username, user.password);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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

  async changeName(id: number, name: string) {
    const user = await this.usersService.changeName(id, name);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async changeUsername(id: number, username: string) {
    const user = await this.usersService.changeUsername(id, username);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async changeEmail(id: number, email: string) {
    const user = await this.usersService.changeEmail(id, email);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async changeAccountDetail(id: number, value: string, field: string) {
    const user = await this.usersService.changeAccountDetail(id, value, field);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }
}
