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
import { Speaker } from '../speakers/entities/speaker.entity';
import { FileUploadService } from '../file_upload/file_upload.service';

export class ResourceDTO {
  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  heading: string;

  @IsNotEmpty()
  bodyText: string;

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
  constructor(
    private adminService: AdminService,
    private fileUploadService: FileUploadService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('resource')
  async createResource(
    @Body() resource: ResourceDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.adminService.createResource(resource, file);
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
    return await this.adminService.updateResource(id, resource, file);
  }

  @Post('resource/:id/order')
  async updateResourceOrder(
    @Param('id') id,
    @Body('direction') direction: string,
  ) {
    return await this.adminService.updateResourceOrder(id, direction);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('speaker')
  async createSpeaker(
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.adminService.createSpeaker(speaker, file);
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
      speakerToSave.photoUrl = await this.fileUploadService.uploadFile(file);
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
