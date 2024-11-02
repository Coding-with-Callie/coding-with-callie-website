import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async getResources() {
    return await this.resourceRepository.find({ order: { order: 'ASC' } });
  }

  async createResource(resource: Resource) {
    const highestOrderResource = await this.resourceRepository
      .createQueryBuilder('resource')
      .orderBy('resource.order', 'DESC')
      .getOne();

    resource.order = highestOrderResource ? highestOrderResource.order + 1 : 1;

    await this.resourceRepository.save(resource);
    return await this.getResources();
  }

  async updateOrder(id: number, direction: string) {
    const resource = await this.resourceRepository.findOneBy({ id });

    if (direction === 'up') {
      const resourceToSwap = await this.resourceRepository.findOneBy({
        order: resource.order - 1,
      });
      resourceToSwap.order += 1;
      resource.order -= 1;
      await this.resourceRepository.save([resource, resourceToSwap]);
    } else {
      const resourceToSwap = await this.resourceRepository.findOneBy({
        order: resource.order + 1,
      });
      resourceToSwap.order -= 1;
      resource.order += 1;
      await this.resourceRepository.save([resource, resourceToSwap]);
    }

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
    const resource = await this.resourceRepository.findOneBy({ id });
    const resources = await this.resourceRepository.find({
      where: {
        order: MoreThan(resource.order),
      },
    });
    resources.forEach((resource) => {
      resource.order -= 1;
    });
    await this.resourceRepository.save(resources);

    await this.resourceRepository.delete(id);
    return await this.getResources();
  }
}
