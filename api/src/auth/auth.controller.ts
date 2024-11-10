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

  @IsNotEmpty()
  userStoryId: number;
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
  async submitReview(@Body() review: ReviewDTO) {
    return await this.authService.submitReview(review);
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
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    return this.authService.createProject(
      projectDto.name,
      projectDto.description,
      req.user.sub,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('project/:id')
  updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.authService.updateProject(
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
    return this.authService.createFeature(
      featureDto.name,
      featureDto.description,
      projectId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Patch('project/:id/feature/:featureId')
  updateFeature(
    @Param('featureId') featureId: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    return this.authService.updateFeature(
      updateFeatureDto.field,
      updateFeatureDto.value,
      featureId,
    );
  }

  @UseGuards(ProjectAccessGuard)
  @Delete('project/:id/feature/:featureId')
  deleteFeature(@Param('featureId') featureId: number) {
    return this.authService.deleteFeature(featureId);
  }

  @UseGuards(ProjectAccessGuard)
  @Post('project/:id/feature/:featureId/user-story')
  createUserStory(
    @Param('id') id: number,
    @Param('featureId') featureId: number,
    @Body() userStoryDto: UserStoryDto,
  ) {
    return this.authService.createUserStory(
      userStoryDto.name,
      userStoryDto.description,
      id,
      featureId,
    );
  }

  @Post('update-user-story')
  updateUserStory(
    @Body() updateUserStoryDto: UpdateUserStoryDto,
    @Request() req,
  ) {
    return this.authService.updateUserStory(
      updateUserStoryDto.field,
      updateUserStoryDto.value,
      req.user.sub,
      updateUserStoryDto.userStoryId,
    );
  }

  @Post('delete-user-story')
  deleteUserStory(@Body('userStoryId') userStoryId: number, @Request() req) {
    return this.authService.deleteUserStory(userStoryId, req.user.sub);
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
