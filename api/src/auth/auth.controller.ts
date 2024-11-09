import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @IsNotEmpty()
  projectId: number;
}

export class UserStoryDto {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  name: string;

  @IsOptional()
  @Transform((params) => sanitizeHTML(params.value))
  description: string;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  featureId: number;
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

  @IsNotEmpty()
  featureId: number;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  field: string;

  // @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  value: string;

  @IsNotEmpty()
  projectId: number;
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

  @Get('user-projects')
  getUserProjects(@Request() req) {
    return this.authService.getUserProjects(req.user.sub);
  }

  @Get('project/:id')
  async getProject(@Param('id') id: number, @Request() req) {
    const project = await this.authService.getProject(req.user.sub, id);

    if (!project) {
      throw new UnauthorizedException(
        'You do not have access to that project.',
      );
    }

    return project;
  }

  @Post('create-project')
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    return this.authService.createProject(
      projectDto.name,
      projectDto.description,
      req.user.sub,
    );
  }

  @Post('update-project')
  updateProject(@Body() updateProjectDto: UpdateProjectDto, @Request() req) {
    return this.authService.updateProject(
      updateProjectDto.field,
      updateProjectDto.value,
      req.user.sub,
      updateProjectDto.projectId,
    );
  }

  @Post('delete-project')
  deleteProject(@Body('projectId') projectId: number, @Request() req) {
    return this.authService.deleteProject(projectId, req.user.sub);
  }

  @Post('create-feature')
  createFeature(@Body() featureDto: FeatureDto, @Request() req) {
    return this.authService.createFeature(
      featureDto.name,
      featureDto.description,
      req.user.sub,
      featureDto.projectId,
    );
  }

  @Post('update-feature')
  updateFeature(@Body() updateFeatureDto: UpdateFeatureDto, @Request() req) {
    return this.authService.updateFeature(
      updateFeatureDto.field,
      updateFeatureDto.value,
      req.user.sub,
      updateFeatureDto.featureId,
    );
  }

  @Post('delete-feature')
  deleteFeature(@Body('featureId') featureId: number, @Request() req) {
    return this.authService.deleteFeature(featureId, req.user.sub);
  }

  @Post('create-user-story')
  createUserStory(@Body() userStoryDto: UserStoryDto, @Request() req) {
    return this.authService.createUserStory(
      userStoryDto.name,
      userStoryDto.description,
      req.user.sub,
      userStoryDto.projectId,
      userStoryDto.featureId,
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
