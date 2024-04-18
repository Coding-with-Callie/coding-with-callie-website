import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from './roles.guard';
import { Speaker } from 'src/speakers/entities/speaker.entity';

export class NewUserDto {
  @IsNotEmpty({ message: 'You must provide a name.' })
  @Transform((params) => sanitizeHTML(params.value))
  name: string;

  @IsEmail(undefined, { message: 'You must enter a valid email address.' })
  @Transform((params) => sanitizeHTML(params.value))
  email: string;

  @IsNotEmpty({ message: 'You must provide a username.' })
  @Transform((params) => sanitizeHTML(params.value))
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserLoginDto {
  @IsNotEmpty({ message: 'You must provide a username.' })
  @Transform((params) => sanitizeHTML(params.value))
  username: string;

  @IsNotEmpty()
  password: string;
}

export class AccountDetailDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty({ message: 'You must provide a new value.' })
  @Transform((params) => sanitizeHTML(params.value))
  value: string;

  @IsNotEmpty()
  field: string;
}

export class Email {
  @IsEmail(undefined, { message: 'You must enter a valid email address.' })
  @Transform((params) => sanitizeHTML(params.value))
  email: string;
}

export class ReviewDto {
  @IsNotEmpty()
  rating: number;

  @Transform((params) => sanitizeHTML(params.value))
  comments: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  displayName: string;

  userId: number;
}

export class AlumniDto {
  name: string;
  opportunities: string[];
  bioText: string[];
  linkedInUrl: string;
  photoUrl: string;
  projectUrl: string;
  workshopId: number;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() newUserDto: NewUserDto) {
    return await this.authService.signUp(newUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userLoginDto: UserLoginDto) {
    return this.authService.signIn(
      userLoginDto.username,
      userLoginDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.sub);
  }

  @Get('profile/:token/:id')
  getProfileReset(@Param('token') token: string, @Param('id') id: number) {
    return this.authService.getProfileReset(token, id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: Email) {
    return this.authService.forgotPassword(body.email);
  }

  @UseGuards(AuthGuard)
  @Post('change-account-detail')
  changeAccountDetail(@Body() accountDetailDto: AccountDetailDto) {
    return this.authService.changeAccountDetail(
      accountDetailDto.id,
      accountDetailDto.value,
      accountDetailDto.field,
    );
  }

  @UseGuards(AuthGuard)
  @Post('delete-account')
  deleteAccount(@Body('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id: number,
  ) {
    await this.authService.uploadFile(id, file);
    return this.authService.getUserProfile(id);
  }

  @UseGuards(AuthGuard)
  @Post('submit-review')
  async submitReview(@Body() review: ReviewDto) {
    return await this.authService.submitReview(review);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('speaker')
  async createSpeaker(@Body() speaker: Speaker) {
    return await this.authService.createSpeaker(speaker);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create-alumni')
  async createAlumni(@Body() alumni: AlumniDto) {
    return await this.authService.createAlumni(alumni);
  }

  @Get('speakers')
  async getSpeakers() {
    return await this.authService.getSpeakers();
  }
}
