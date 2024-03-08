import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workshop } from './entities/workshop.entity';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopsRepository: Repository<Workshop>,
  ) {}

  async findOneById(id: number) {
    return await this.workshopsRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.workshopsRepository.find();
  }
}
