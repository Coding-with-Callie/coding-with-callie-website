import { Injectable } from '@nestjs/common';
import { WorkshopsService } from './workshops/workshops.service';
import { AlumniService } from './alumni/alumni.service';

@Injectable()
export class AppService {
  constructor(
    private readonly workshopsService: WorkshopsService,
    private readonly alumniService: AlumniService,
  ) {}

  async getAllWorkshops() {
    return await this.workshopsService.findAll();
  }

  async getWorkshopById(id: number) {
    return await this.workshopsService.findOneById(id);
  }

  async getAllAlumni() {
    return await this.alumniService.findAllAlumni();
  }
}
