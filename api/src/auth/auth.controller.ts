import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Optional,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from './roles.guard';
import { Resource } from '../resource/entities/resource.entity';
import { Speaker } from '../speakers/entities/speaker.entity';

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

export class ReviewDto {
  @IsNotEmpty()
  rating: number;

  @Transform((params) => sanitizeHTML(params.value))
  comments: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  displayName: string;

  userId: number;
}

export class AlumniDto {
  name: string;
  opportunities: string[];
  bioText: string[];
  linkedInUrl: string;
  photoUrl: string;
  projectUrl: string;
  workshopId: number;
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

export class ResourceDTO {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  heading: string;

  @IsNotEmpty()
  bodyText: string[] | string;

  imageUrl?: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  buttonText: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  linkUrl: string;

  @IsNotEmpty()
  target: string | boolean;
}

export class SpeakerDTO {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  name: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  date: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  bioText: string[] | string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  sessionText: string[] | string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  websiteUrl: string;

  @IsOptional()
  @Transform((params) => sanitizeHTML(params.value))
  sessionRecordingUrl: string;

  photoUrl?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('user-details')
  getUserDetailsForHeader(@Request() req) {
    return this.authService.getUserProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.sub);
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
  @Post('upload-profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id: number,
  ) {
    await this.authService.uploadProfileImage(id, file);
    return this.authService.getUserProfile(id);
  }

  @UseGuards(AuthGuard)
  @Post('submit-review')
  async submitReview(@Body() review: ReviewDto) {
    return await this.authService.submitReview(review);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('resource')
  async createResource(
    @Body() resource: ResourceDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const resourceToSave = new Resource();

    resourceToSave.heading = resource.heading;
    resourceToSave.bodyText = resource.bodyText;
    resourceToSave.imageUrl = await this.authService.uploadFile(file);
    resourceToSave.buttonText = resource.buttonText;
    resourceToSave.linkUrl = resource.linkUrl;
    resourceToSave.target = resource.target === 'true';

    if (typeof resourceToSave.bodyText === 'string') {
      resourceToSave.bodyText = resourceToSave.bodyText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    return await this.authService.createResource(resourceToSave);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('resource/:id')
  async deleteResource(@Param('id') id: number) {
    return await this.authService.deleteResource(id);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('resource/:id')
  async updateResource(
    @Param('id') id: number,
    @Body() resource: ResourceDTO,
    @UploadedFile() @Optional() file?: Express.Multer.File,
  ) {
    const resourceToSave = new Resource();

    if (file) {
      resourceToSave.imageUrl = await this.authService.uploadFile(file);
    }

    resourceToSave.heading = resource.heading;
    resourceToSave.bodyText = resource.bodyText;
    resourceToSave.buttonText = resource.buttonText;
    resourceToSave.linkUrl = resource.linkUrl;
    resourceToSave.target = resource.target === 'true';

    if (typeof resourceToSave.bodyText === 'string') {
      resourceToSave.bodyText = resourceToSave.bodyText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    return await this.authService.updateResource(id, resourceToSave);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('resource/:id/order')
  async updateResourceOrder(
    @Param('id') id,
    @Body('direction') direction: string,
  ) {
    return await this.authService.updateResourceOrder(id, direction);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('speaker')
  async createSpeaker(
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    speaker.photoUrl = await this.authService.uploadFile(file);

    if (typeof speaker.bioText === 'string') {
      speaker.bioText = speaker.bioText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    if (typeof speaker.sessionText === 'string') {
      speaker.sessionText = speaker.sessionText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    return await this.authService.createSpeaker(speaker);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('speaker/:id')
  async deleteSpeaker(@Param('id') id: number) {
    return await this.authService.deleteSpeaker(id);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('speaker/:id')
  async updateSpeaker(
    @Param('id') id: number,
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const speakerToSave = new Speaker();

    if (file) {
      speakerToSave.photoUrl = await this.authService.uploadFile(file);
    }

    speakerToSave.name = speaker.name;
    speakerToSave.date = speaker.date;
    speakerToSave.websiteUrl = speaker.websiteUrl;
    speakerToSave.sessionRecordingUrl = speaker.sessionRecordingUrl;

    if (typeof speaker.bioText === 'string') {
      speakerToSave.bioText = speaker.bioText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    if (typeof speaker.sessionText === 'string') {
      speakerToSave.sessionText = speaker.sessionText
        .replace(/\r\n/g, '\n') // Replace \r\n with \n
        .split(/\n+/) // Split at one or more newlines
        .map((item: string) => item.trim()) // Trim whitespace from each item
        .filter((item: string) => item.length > 0); // Remove empty items
    }

    return await this.authService.updateSpeaker(id, speakerToSave);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create-alumni')
  async createAlumni(@Body() alumni: AlumniDto) {
    return await this.authService.createAlumni(alumni);
  }

  @UseGuards(AuthGuard)
  @Get('user-projects')
  getUserProjects(@Request() req) {
    return this.authService.getUserProjects(req.user.sub);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post('create-project')
  createProject(@Body() projectDto: ProjectDto, @Request() req) {
    return this.authService.createProject(
      projectDto.name,
      projectDto.description,
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard)
  @Post('update-project')
  updateProject(@Body() updateProjectDto: UpdateProjectDto, @Request() req) {
    return this.authService.updateProject(
      updateProjectDto.field,
      updateProjectDto.value,
      req.user.sub,
      updateProjectDto.projectId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('delete-project')
  deleteProject(@Body('projectId') projectId: number, @Request() req) {
    return this.authService.deleteProject(projectId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('create-feature')
  createFeature(@Body() featureDto: FeatureDto, @Request() req) {
    return this.authService.createFeature(
      featureDto.name,
      featureDto.description,
      req.user.sub,
      featureDto.projectId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('update-feature')
  updateFeature(@Body() updateFeatureDto: UpdateFeatureDto, @Request() req) {
    return this.authService.updateFeature(
      updateFeatureDto.field,
      updateFeatureDto.value,
      req.user.sub,
      updateFeatureDto.featureId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('delete-feature')
  deleteFeature(@Body('featureId') featureId: number, @Request() req) {
    return this.authService.deleteFeature(featureId, req.user.sub);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post('delete-user-story')
  deleteUserStory(@Body('userStoryId') userStoryId: number, @Request() req) {
    return this.authService.deleteUserStory(userStoryId, req.user.sub);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post('update-task')
  updateTask(@Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.authService.updateTask(
      updateTaskDto.field,
      updateTaskDto.value,
      req.user.sub,
      updateTaskDto.taskId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('delete-task')
  deleteTask(@Body('taskId') taskId: number, @Request() req) {
    return this.authService.deleteTask(taskId, req.user.sub);
  }
}
