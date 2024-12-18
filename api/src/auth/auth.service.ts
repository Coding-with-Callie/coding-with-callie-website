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

  async changeUserDetail(id: number, field: string, value: string) {
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

  async getChecklists(userId: number) {
    return await this.checklistService.getChecklists(userId);
  }

  async getChecklistById(userId: number, checklistId: number) {
    return await this.checklistService.getChecklistById(userId, checklistId);
  }

  async createChecklist(
    userId: number,
    checklistId: number,
    name: string,
    description?: string,
    parentId?: number,
  ) {
    // Create the checklist
    await this.checklistService.createChecklist(
      userId,
      name,
      description,
      parentId,
    );

    // Return the updated checklist
    return await this.checklistService.getChecklistById(userId, checklistId);
  }

  async updateChecklistField(
    userId: number,
    parentListId: number,
    checklistId: number,
    field: string,
    value: string,
  ) {
    // Update the field
    await this.checklistService.updateChecklistField(
      userId,
      checklistId,
      field,
      value,
    );

    // Return the updated checklist
    return await this.checklistService.getChecklistById(userId, parentListId);
  }
}
