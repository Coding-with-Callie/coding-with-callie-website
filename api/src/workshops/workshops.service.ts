import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workshop } from './entities/workshop.entity';
import { Workshop as WorkshopType } from './content/type';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopsRepository: Repository<Workshop>,
  ) {}

  async createWorkshop(workshop: WorkshopType) {
    return await this.workshopsRepository.save(workshop);
  }

  async findAll() {
    return await this.workshopsRepository.find();
  }
}
