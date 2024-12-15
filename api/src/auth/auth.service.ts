import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ReviewService } from '../review/review.service';
import { FileUploadService } from '../file_upload/file_upload.service';
import { ReviewDTO } from './auth.controller';
import { ChecklistService } from '../checklists/checklist.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private reviewService: ReviewService,
    private fileUploadService: FileUploadService,
    private checklistService: ChecklistService,
  ) {}
  async getFrontendFriendlyUser(id: number) {
    return await this.usersService.getFrontendFriendlyUser(id);
  }

  async changeAccountDetail(id: number, field: string, value: string) {
    return await this.usersService.changeAccountDetail(id, field, value);
  }

  async changePassword(id: number, password: string, newPassword: string) {
    return await this.usersService.changePassword(id, password, newPassword);
  }

  async softDeleteUser(id: number) {
    return await this.usersService.softDeleteUser(id);
  }

  async uploadFile(file: Express.Multer.File) {
    return await this.fileUploadService.uploadFile(file);
  }

  async uploadProfileImage(id: number, file: Express.Multer.File) {
    const photoUrl = await this.uploadFile(file);
    return await this.usersService.changeAccountDetail(id, 'photo', photoUrl);
  }

  async submitReviewAndReturnUpdatedReviews(review: ReviewDTO, userId: number) {
    // Submit the review
    await this.reviewService.submitReview(review, userId);

    // Return the updated reviews
    return await this.reviewService.getAllReviews();
  }

  async getChecklists(userId: number, topLevel: boolean, checklistId?: number) {
    return await this.checklistService.getChecklists(
      userId,
      topLevel,
      checklistId,
    );
  }
}
