import { Injectable } from '@nestjs/common';
import { WorkshopsService } from './workshops/workshops.service';
import { AlumniService } from './alumni/alumni.service';
import { ResourceService } from './resource/resource.service';

@Injectable()
export class AppService {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly workshopsService: WorkshopsService,
    private readonly alumniService: AlumniService,
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
}
