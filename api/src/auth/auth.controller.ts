import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';

// export class AccountDetailDTO {
//   @IsNotEmpty()
//   id: number;

//   @IsNotEmpty({ message: 'You must provide a new value.' })
//   @Transform((params) => sanitizeHTML(params.value))
//   value: string;

//   @IsNotEmpty()
//   field: string;
// }

export class ReviewDTO {
  @IsNotEmpty()
  rating: number;

  @Transform((params) => sanitizeHTML(params.value))
  comments: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  displayName: string;
}

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('user-details')
  getUserDetailsForHeader(@Request() req) {
    return this.authService.getFrontendFriendlyUser(req.user.sub);
  }

  @Get('profile')
  getUserProfile(@Request() req) {
    return this.authService.getFrontendFriendlyUser(req.user.sub);
  }

  @Post('change-account-detail')
  changeAccountDetail(
    @Body() detail: { [key: string]: string },
    @Request() req,
  ) {
    return this.authService.changeAccountDetail(
      req.user.sub,
      Object.keys(detail)[0],
      detail[Object.keys(detail)[0]],
    );
  }

  @Post('change-password')
  changePassword(
    @Body() password: { password: string; newPassword: string },
    @Request() req,
  ) {
    return this.authService.changePassword(
      req.user.sub,
      password.password,
      password.newPassword,
    );
  }

  @Post('delete-account')
  softDeleteUser(@Body('id') id: number) {
    return this.authService.softDeleteUser(id);
  }

  @Post('upload-profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    await this.authService.uploadProfileImage(req.user.sub, file);
    return this.authService.getFrontendFriendlyUser(req.user.sub);
  }

  @Post('review')
  async submitReviewAndReturnUpdatedReviews(
    @Body() review: ReviewDTO,
    @Request() req,
  ) {
    return await this.authService.submitReviewAndReturnUpdatedReviews(
      review,
      req.user.sub,
    );
  }

  @Get('checklists')
  async getChecklists(@Request() req, @Query('topLevel') topLevel: boolean) {
    console.log('topLevel', topLevel);
    return await this.authService.getChecklists(req.user.sub, topLevel);
  }
}
