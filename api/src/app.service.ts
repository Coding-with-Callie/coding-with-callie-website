import { Injectable } from '@nestjs/common';
import { WorkshopsService } from './workshops/workshops.service';

@Injectable()
export class AppService {
  constructor(private readonly workshopsService: WorkshopsService) {}

  async getAllWorkshops() {
    return await this.workshopsService.findAll();
  }

  async getWorkshopById(id: number) {
    return await this.workshopsService.findOneById(id);
  }
}
