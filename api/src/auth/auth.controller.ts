import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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

  @Get('checklist/:id')
  async getChecklist(@Request() req, @Param('id') id: number) {
    return await this.authService.getChecklistById(req.user.sub, id);
  }

  @Get('checklists')
  async getChecklists(@Request() req) {
    return await this.authService.getChecklists(req.user.sub);
  }

  @Post('checklists')
  async createChecklist(
    @Request() req,
    @Body('checklistId') checklistId: number,
    @Body('name') name: string,
    @Body('description') description?: string,
    @Body('parentId') parentId?: number,
  ) {
    return await this.authService.createChecklist(
      req.user.sub,
      checklistId,
      name,
      description,
      parentId,
    );
  }

  @Patch('checklists/:checklistId/:itemId')
  async updateChecklistField(
    @Request() req,
    @Body('field') field: string,
    @Body('value') value: string,
    @Param('checklistId') checklistId: number,
    @Param('itemId') itemId: number,
  ) {
    return await this.authService.updateChecklistField(
      req.user.sub,
      checklistId,
      itemId,
      field,
      value,
    );
  }
}
