import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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

export class AccountDetailDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty({ message: 'You must provide a new value.' })
  @Transform((params) => sanitizeHTML(params.value))
  value: string;

  @IsNotEmpty()
  field: string;
}

export class ReviewDTO {
  @IsNotEmpty()
  rating: number;

  @Transform((params) => sanitizeHTML(params.value))
  comments: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  displayName: string;

  userId: number;
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

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  featureId: number;

  @IsNotEmpty()
  userStoryId: number;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  field: string;

  // @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  value: string;

  @IsNotEmpty()
  taskId: number;
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
    return this.authService.getUserProfile(req.user.sub);
  }

  @Get('profile')
  getUserProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.sub);
  }

  @Post('change-account-detail')
  changeAccountDetail(@Body() accountDetails: AccountDetailDTO) {
    return this.authService.changeAccountDetail(
      accountDetails.id,
      accountDetails.field,
      accountDetails.value,
    );
  }

  @Post('delete-account')
  deleteAccount(@Body('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @Post('upload-profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id: number,
  ) {
    await this.authService.uploadProfileImage(id, file);
    return this.authService.getUserProfile(id);
  }

  @Post('submit-review')
  async submitReviewAndReturnUpdatedReviews(@Body() review: ReviewDTO) {
    return await this.authService.submitReviewAndReturnUpdatedReviews(review);
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
    @Param('featureId') featureId: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    return this.authService.updateFeatureAndReturnUpdatedProject(
      updateFeatureDto.field,
      updateFeatureDto.value,
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

  @Post('create-task')
  createTask(@Body() taskDto: TaskDto, @Request() req) {
    return this.authService.createTask(
      taskDto.name,
      req.user.sub,
      taskDto.projectId,
      taskDto.featureId,
      taskDto.userStoryId,
    );
  }

  @Post('update-task')
  updateTask(@Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.authService.updateTask(
      updateTaskDto.field,
      updateTaskDto.value,
      req.user.sub,
      updateTaskDto.taskId,
    );
  }

  @Post('delete-task')
  deleteTask(@Body('taskId') taskId: number, @Request() req) {
    return this.authService.deleteTask(taskId, req.user.sub);
  }
}
