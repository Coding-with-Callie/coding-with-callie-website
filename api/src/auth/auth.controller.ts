import {
  Body,
  Controller,
  Delete,
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
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProjectAccessGuard } from './project-access.guard';

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

export class ProjectDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHTML(params.value))
  description: string;
}

export class FeatureDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHTML(params.value))
  description: string;
}

export class UserStoryDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHTML(params.value))
  description: string;
}

export class TaskDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  name: string;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  field: string;

  // @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  value: string;
}

export class UpdateUserStoryDto {
  @IsNotEmpty()
  field: string;

  // @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  value: string;
}

export class UpdateFeatureDto {
  @IsNotEmpty()
  field: string;

  // @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  value: string;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  field: string;

  // @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  value: string;
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

  @Get('project')
  getUserProjects(@Request() req) {
    return this.authService.getUserProjects(req.user.sub);
  }

  @UseGuards(ProjectAccessGuard)
  @Get('project/:id')
  async getProject(@Param('id') id: number) {
    return await this.authService.getProject(id);
  }

  @Post('project')
  createProjectAndReturnUpdatedProjects(
    @Body() projectDto: ProjectDto,
    @Request() req,
  ) {
    return this.authService.createProjectAndReturnUpdatedProjects(
      projectDto.name,
      projectDto.description,
      req.user.sub,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('project/:id')
  updateProjectAndReturnUpdatedProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.authService.updateProjectAndReturnUpdatedProject(
      updateProjectDto.field,
      updateProjectDto.value,
      id,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Delete('project/:id')
  deleteProject(@Param('id') id: number) {
    return this.authService.deleteProject(id);
  }

  @UseGuards(ProjectAccessGuard)
  @Get('project/:id/feature/:featureId')
  getFeature(@Param('id') id: number, @Param('featureId') featureId: number) {
    return this.authService.getFeature(id, featureId);
  }

  @UseGuards(ProjectAccessGuard)
  @Post('project/:id/feature')
  createFeature(
    @Param('id') projectId: number,
    @Body() featureDto: FeatureDto,
  ) {
    return this.authService.createFeatureAndReturnUpdatedProject(
      featureDto.name,
      featureDto.description,
      projectId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('project/:id/feature/:featureId')
  updateFeatureAndReturnUpdatedProject(
    @Param('id') projectId: number,
    @Param('featureId') featureId: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    return this.authService.updateFeatureAndReturnUpdatedProject(
      updateFeatureDto.field,
      updateFeatureDto.value,
      projectId,
      featureId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Delete('project/:id/feature/:featureId')
  deleteFeatureAndReturnUpdatedProject(@Param('featureId') featureId: number) {
    return this.authService.deleteFeatureAndReturnUpdatedProject(featureId);
  }

  @UseGuards(ProjectAccessGuard)
  @Post('project/:id/feature/:featureId/user-story')
  createUserStoryAndReturnUpdatedProject(
    @Param('id') id: number,
    @Param('featureId') featureId: number,
    @Body() userStoryDto: UserStoryDto,
  ) {
    return this.authService.createUserStoryAndReturnUpdatedProject(
      userStoryDto.name,
      userStoryDto.description,
      id,
      featureId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('project/:id/feature/:featureId/user-story/:userStoryId')
  updateUserStoryAndReturnUpdatedProject(
    @Param('userStoryId') userStoryId: number,
    @Param('id') projectId: number,
    @Body() updateUserStoryDto: UpdateUserStoryDto,
  ) {
    return this.authService.updateUserStoryAndReturnUpdatedProject(
      updateUserStoryDto.field,
      updateUserStoryDto.value,
      userStoryId,
      projectId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Delete('project/:id/feature/:featureId/user-story/:userStoryId')
  deleteUserStoryAndReturnUpdatedProject(
    @Param('userStoryId') userStoryId: number,
    @Param('id') projectId: number,
  ) {
    return this.authService.deleteUserStoryAndReturnUpdatedProject(
      userStoryId,
      projectId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Post('project/:id/feature/:featureId/user-story/:userStoryId/task')
  createTaskAndReturnUpdatedProject(
    @Param('id') projectId: number,
    @Param('featureId') featureId: number,
    @Param('userStoryId') userStoryId: number,
    @Body() taskDto: TaskDto,
  ) {
    return this.authService.createTaskAndReturnUpdatedProject(
      taskDto.name,
      projectId,
      featureId,
      userStoryId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('project/:id/feature/:featureId/user-story/:userStoryId/task/:taskId')
  updateTaskAndReturnTaskCompletionRatio(
    @Param('taskId') taskId: number,
    @Param('userStoryId') userStoryId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.authService.updateTaskAndReturnTaskCompletionRatio(
      updateTaskDto.field,
      updateTaskDto.value,
      taskId,
      userStoryId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Delete('project/:id/feature/:featureId/user-story/:userStoryId/task/:taskId')
  deleteTaskAndReturnUpdatedTasksWithTaskCompletionRatio(
    @Param('taskId') taskId: number,
    @Param('userStoryId') userStoryId: number,
  ) {
    return this.authService.deleteTaskAndReturnUpdatedTasksWithTaskCompletionRatio(
      taskId,
      userStoryId,
    );
  }
}
