import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

export class newUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
}

export class userDto {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() newUserDto: newUserDto) {
    return this.authService.signUp(newUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userDto: userDto) {
    return this.authService.signIn(userDto.username, userDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.username);
  }
}
