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

  async updateResource(id: number, resource: Resource) {
    const resourceToUpdate = await this.resourceRepository.findOneBy({ id });

    if (resource.imageUrl) {
      resourceToUpdate.imageUrl = resource.imageUrl;
    }

    resourceToUpdate.heading = resource.heading;
    resourceToUpdate.bodyText = resource.bodyText;
    resourceToUpdate.buttonText = resource.buttonText;
    resourceToUpdate.linkUrl = resource.linkUrl;
    resourceToUpdate.target = resource.target;
    await this.resourceRepository.save(resourceToUpdate);
    return await this.getResources();
  }

  async deleteResource(id: number) {
    await this.resourceRepository.delete(id);
    return await this.getResources();
  }
}
