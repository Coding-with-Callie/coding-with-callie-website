import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async getResources() {
    return await this.resourceRepository.find();
  }

  async createResource(resource: Resource) {
    await this.resourceRepository.save(resource);
    return await this.getResources();
  }

  async deleteResource(id: number) {
    await this.resourceRepository.delete(id);
    return await this.getResources();
  }
}
