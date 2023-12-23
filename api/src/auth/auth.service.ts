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
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserProfile(username: string) {
    const user = await this.usersService.findOne(username);
    return { name: user.name, username: user.username };
  }
}
