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
    return this.authService.getUserProfile(req.user.sub);
  }

  @Get('profile/:token/:id')
  getProfileReset(@Request() req) {
    return this.authService.getProfileReset(req.params.token, req.params.id);
  }

  @UseGuards(AuthGuard)
  @Post('change-account-detail')
  changeAccountDetail(@Body() body) {
    return this.authService.changeAccountDetail(
      body.id,
      body.value,
      body.field,
    );
  }

  @UseGuards(AuthGuard)
  @Post('delete-account')
  deleteAccount(@Body() body) {
    return this.authService.deleteUser(body.id);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body) {
    return this.authService.forgotPassword(body.email);
  }

  @UseGuards(AuthGuard)
  @Get('user-submissions')
  getUserSubmissions(@Request() req) {
    const userId = req.user.sub;
    return this.authService.getUserSubmissions(userId);
  }

  @UseGuards(AuthGuard)
  @Get('all-submissions/:id')
  getAllSubmissions(@Request() req) {
    return this.authService.getAllSubmissions(req.params.id);
  }

  @UseGuards(AuthGuard)
  @Post('submit-deliverable')
  submitDeliverable(@Body() deliverable: any) {
    return this.authService.submitDeliverable(deliverable);
  }

  @UseGuards(AuthGuard)
  @Post('submit-feedback')
  async submitFeedback(@Body() feedbackDto: any) {
    await this.authService.submitFeedback(feedbackDto);
    return this.authService.getAllSubmissions(feedbackDto.sessionId);
  }

  @UseGuards(AuthGuard)
  @Post('edit-feedback')
  async editFeedback(@Body() feedbackDto: any) {
    const result = await this.authService.editFeedback(feedbackDto);
    return this.authService.getUserProfile(result.user.id);
  }
}
