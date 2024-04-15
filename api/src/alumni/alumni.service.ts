import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumni } from './entities/alumni.entity';
import { AlumniDto } from 'src/auth/auth.controller';

@Injectable()
export class AlumniService {
  constructor(
    @InjectRepository(Alumni)
    private readonly alumniRepository: Repository<Alumni>,
  ) {}
  async createAlumni(alumni: AlumniDto) {
    return await this.alumniRepository.save({ ...alumni });
  }

  async findAllAlumni() {
    return await this.alumniRepository.find({
      relations: ['workshop'],
    });
  }
}
