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
  bioText: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  sessionText: string;

  @IsNotEmpty()
  @Transform((params) => sanitizeHTML(params.value))
  websiteUrl: string;

  @IsOptional()
  @Transform((params) => sanitizeHTML(params.value))
  sessionRecordingUrl?: string;

  @IsOptional()
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
  async createResourceAndReturnUpdatedResources(
    @Body() resource: ResourceDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.adminService.createResourceAndReturnUpdatedResources(
      resource,
      file,
    );
  }

  @Delete('resource/:id')
  async deleteResourceAndReturnUpdatedResources(@Param('id') id: number) {
    return await this.adminService.deleteResourceAndReturnUpdatedResources(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('resource/:id')
  async updateResourceAndReturnUpdatedResources(
    @Param('id') id: number,
    @Body() resource: ResourceDTO,
    @UploadedFile() @Optional() file?: Express.Multer.File,
  ) {
    return await this.adminService.updateResourceAndReturnUpdatedResources(
      id,
      resource,
      file,
    );
  }

  @Post('resource/:id/order')
  async updateResourceOrderAndReturnUpdatedResources(
    @Param('id') id,
    @Body('direction') direction: string,
  ) {
    return await this.adminService.updateResourceOrderAndReturnUpdatedResources(
      id,
      direction,
    );
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('speaker')
  async createSpeakerAndReturnUpdatedSpeakers(
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.adminService.createSpeakerAndReturnUpdatedSpeakers(
      speaker,
      file,
    );
  }

  @Delete('speaker/:id')
  async deleteSpeakerAndReturnUpdatedSpeakers(@Param('id') id: number) {
    return await this.adminService.deleteSpeakerAndReturnUpdatedSpeakers(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('speaker/:id')
  async updateSpeakerAndReturnUpdatedSpeakers(
    @Param('id') id: number,
    @Body() speaker: SpeakerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.adminService.updateSpeakerAndReturnUpdatedSpeakers(
      id,
      speaker,
      file,
    );
  }
}
