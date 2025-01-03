import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileUploadService } from './file_upload/file_upload.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';

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

  photo?: string;
}

export class UserLoginDto {
  @IsNotEmpty({ message: 'You must provide a username.' })
  @Transform((params) => sanitizeHTML(params.value))
  username: string;

  @IsNotEmpty()
  password: string;
}

export class Email {
  @IsEmail(undefined, { message: 'You must enter a valid email address.' })
  @Transform((params) => sanitizeHTML(params.value))
  email: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get('routes')
  getRoutes() {
    return this.appService.getRoutes();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('signup')
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() newUser: NewUserDto,
  ) {
    let photoUrl = null;
    if (file) {
      photoUrl = await this.fileUploadService.uploadFile(file);
    }
    return await this.appService.registerUserAndLogIn(newUser, photoUrl);
  }

  @Post('login')
  signIn(@Body() userLoginDto: UserLoginDto) {
    return this.appService.logIn(userLoginDto.username, userLoginDto.password);
  }

  @Get('profile/:token/:id')
  getLongTermToken(@Param('token') token: string, @Param('id') id: number) {
    return this.appService.getLongTermToken(token, id);
  }

  @Post('forgot-password')
  sendPasswordResetEmail(@Body() body: Email) {
    return this.appService.sendPasswordResetEmail(body.email);
  }

  @Get('resources')
  getAllResources() {
    return this.appService.getAllResources();
  }

  @Get('workshops')
  getAllWorkshops() {
    return this.appService.getAllWorkshops();
  }

  @Get('speakers')
  async getAllSpeakers() {
    return await this.appService.getAllSpeakers();
  }
}
