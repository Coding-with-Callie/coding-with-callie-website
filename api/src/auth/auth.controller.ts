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
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from './roles.guard';
import { Speaker } from 'src/speakers/entities/speaker.entity';
import { Workshop } from 'src/workshops/content/type';

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

export class DeliverableDto {
  @IsNotEmpty()
  workshopId: number;

  @IsNotEmpty()
  session: number;

  @IsNotEmpty({ message: 'You must submit a valid URL.' })
  @IsUrl(undefined, { message: 'You must submit a valid URL.' })
  @Transform((params) => sanitizeHTML(params.value))
  url: string;

  @IsNotEmpty()
  userId: number;

  videoDate: string;
}

export class FeedbackDto {
  @IsNotEmpty({ message: 'You must provide feedback.' })
  @Transform((params) => sanitizeHTML(params.value))
  positiveFeedback: string;

  @IsNotEmpty({ message: 'You must provide feedback.' })
  @Transform((params) => sanitizeHTML(params.value))
  immediateChangesRequested: string;

  @IsNotEmpty({ message: 'You must provide feedback.' })
  @Transform((params) => sanitizeHTML(params.value))
  longTermChangesRequested: string;

  feedbackProviderId: number;

  submissionId: number;

  sessionId: number;

  workshopId: number;
}

export class ReviewDto {
  @IsNotEmpty()
  rating: number;

  @Transform((params) => sanitizeHTML(params.value))
  comments: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  displayName: string;

  session: string;

  userId: number;

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

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('adminData')
  getAllUsers() {
    return this.authService.getAdminData();
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('user-details/:id')
  getUserDetails(@Param('id') id: number) {
    return this.authService.getUserProfile(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('resources/:id')
  getWorkshopResources(@Param('id') id: number, @Request() req) {
    return this.authService.getWorkshopResources(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('my-workshops')
  getMyWorkshops(@Request() req) {
    return this.authService.getMyWorkshops(req.user.sub);
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
  @Get('solution-videos/:workshopId/:id')
  getSolutionVideos(@Request() req) {
    return this.authService.getSolutionVideos(
      req.params.workshopId,
      req.params.id,
    );
  }

  @UseGuards(AuthGuard)
  @Get('user-submissions')
  getUserSubmissions(@Request() req) {
    const userId = req.user.sub;
    return this.authService.getUserSubmissions(userId);
  }

  @UseGuards(AuthGuard)
  @Get('all-submissions/:workshopId/:id')
  getAllSubmissions(@Request() req) {
    const userId = req.user.sub;

    return this.authService.getAllSubmissions(
      req.params.workshopId,
      req.params.id,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('submit-deliverable')
  async submitDeliverable(@Body() deliverable: DeliverableDto) {
    const url = deliverable.url;
    if (url.indexOf('http') === -1) {
      deliverable.url = 'http://' + url;
    }

    const user = await this.authService.getUserProfile(deliverable.userId);
    await this.authService.submitDeliverable(deliverable, user);
    return await this.authService.getUserProfile(deliverable.userId);
  }

  @UseGuards(AuthGuard)
  @Post('edit-deliverable')
  async editDeliverable(@Body() deliverable: DeliverableDto) {
    const url = deliverable.url;
    if (url.indexOf('http') === -1) {
      deliverable.url = 'http://' + url;
    }

    await this.authService.editDeliverable(deliverable);
    return this.authService.getUserProfile(deliverable.userId);
  }

  @UseGuards(AuthGuard)
  @Post('submit-feedback')
  async submitFeedback(@Body() feedbackDto: FeedbackDto) {
    await this.authService.submitFeedback(feedbackDto);
    const submissions = await this.authService.getAllSubmissions(
      feedbackDto.workshopId,
      feedbackDto.sessionId,
      feedbackDto.feedbackProviderId,
    );
    return submissions;
  }

  @UseGuards(AuthGuard)
  @Post('edit-feedback')
  async editFeedback(@Body() feedbackDto: FeedbackDto) {
    const result = await this.authService.editFeedback(feedbackDto);
    return this.authService.getUserProfile(result.user.id);
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
  @Post('create-workshop')
  async createWorkshop(@Body() workshop?: Workshop) {
    return await this.authService.createWorkshop(workshop);
  }

  @Get('speakers')
  async getSpeakers() {
    return await this.authService.getSpeakers();
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body('lineItems') lineItems: any[],
    @Body('userId') userId: number,
  ) {
    return await this.authService.createCheckoutSession(lineItems, userId);
  }

  @Get('session-status')
  async getSessionStatus(@Request() req) {
    return await this.authService.getSessionStatus(
      req.query.session_id,
      req.query.userId,
    );
  }

  @Post('webhook')
  async receiveWebhook(@Body() body) {
    return await this.authService.receiveWebhook(body);
  }

  @UseGuards(AuthGuard)
  @Post('add-workshop-to-cart')
  async addWorkshopToCart(@Request() req, @Body('workshopId') workshopId) {
    return await this.authService.addWorkshopToCart(workshopId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('delete-workshop-from-cart')
  async deleteWorkshopFromCart(@Request() req, @Body('workshopId') workshopId) {
    return await this.authService.deleteWorkshopFromCart(
      workshopId,
      req.user.sub,
    );
  }
}
