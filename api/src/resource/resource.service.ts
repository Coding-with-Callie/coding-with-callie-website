import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceDTO } from 'src/auth/auth.controller';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async getResources() {
    return await this.resourceRepository.find();
  }

  async createResource(resource: ResourceDTO) {
    await this.resourceRepository.save(resource);
    return await this.getResources();
  }
}
