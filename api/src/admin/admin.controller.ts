import {
  Body,
  Controller,
  Delete,
  Optional,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles, RolesGuard } from './roles.guard';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHTML from 'sanitize-html';
import { Resource } from '../resource/entities/resource.entity';
import { Speaker } from '../speakers/entities/speaker.entity';

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

@Roles(['admin'])
@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('resource')
  async createResource(
    @Body() resource: ResourceDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const resourceToSave = new Resource();

    resourceToSave.heading = resource.heading;
    resourceToSave.bodyText = resource.bodyText;
    resourceToSave.imageUrl = await this.adminService.uploadFile(file);
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

    return await this.adminService.createResource(resourceToSave);
  }

  @Delete('resource/:id')
  async deleteResource(@Param('id') id: number) {
    return await this.adminService.deleteResource(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('resource/:id')
  async updateResource(
    @Param('id') id: number,
    @Body() resource: ResourceDTO,
    @UploadedFile() @Optional() file?: Express.Multer.File,
  ) {
    const resourceToSave = new Resource();

    if (file) {
      resourceToSave.imageUrl = await this.adminService.uploadFile(file);
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

    return await this.adminService.updateResource(id, resourceToSave);
  }

  @Post('resource/:id/order')
  async updateResourceOrder(
    @Param('id') id,
    @Body('direction') direction: string,
  ) {
    return await this.adminService.updateResourceOrder(id, direction);
  }

  // TODO: Move this to admin.controller.ts
  @UseInterceptors(FileInterceptor('file'))
  @Post('speaker')
  async createSpeaker(
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    speaker.photoUrl = await this.adminService.uploadFile(file);

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

    return await this.adminService.createSpeaker(speaker);
  }

  // TODO: Move this to admin.controller.ts
  @Delete('speaker/:id')
  async deleteSpeaker(@Param('id') id: number) {
    return await this.adminService.deleteSpeaker(id);
  }

  // TODO: Move this to admin.controller.ts
  @UseInterceptors(FileInterceptor('file'))
  @Put('speaker/:id')
  async updateSpeaker(
    @Param('id') id: number,
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const speakerToSave = new Speaker();

    if (file) {
      speakerToSave.photoUrl = await this.adminService.uploadFile(file);
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

    return await this.adminService.updateSpeaker(id, speakerToSave);
  }
}
