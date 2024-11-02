import { Injectable } from '@nestjs/common';
import { WorkshopsService } from './workshops/workshops.service';
import { AlumniService } from './alumni/alumni.service';
import { ResourceService } from './resource/resource.service';
import { FileUploadService } from './file_upload/file_upload.service';

@Injectable()
export class AppService {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly workshopsService: WorkshopsService,
    private readonly alumniService: AlumniService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getAllResources() {
    return await this.resourceService.getResources();
  }

  async getAllWorkshops() {
    return await this.workshopsService.findAll();
  }

  async getAllAlumni() {
    return await this.alumniService.findAllAlumni();
  }

  async testUploadImage(file: Express.Multer.File) {
    return await this.fileUploadService.uploadFile(file);
  }
}
