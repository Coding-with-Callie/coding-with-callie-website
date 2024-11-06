import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceDTO } from '../admin/admin.controller';
import { FileUploadService } from '../file_upload/file_upload.service';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private fileUploadService: FileUploadService,
  ) {}

  async getResources() {
    const resources = await this.resourceRepository.find({
      order: { order: 'ASC' },
    });
    return resources;
  }

  async createResource(resource: ResourceDTO, file: Express.Multer.File) {
    const resourceToSave = new Resource();

    resourceToSave.heading = resource.heading;
    resourceToSave.imageUrl = await this.fileUploadService.uploadFile(file);
    resourceToSave.buttonText = resource.buttonText;
    resourceToSave.linkUrl = resource.linkUrl;
    resourceToSave.target = resource.target === 'true';
    resourceToSave.bodyText = resource.bodyText
      .replace(/\r\n/g, '\n') // Replace \r\n with \n
      .split(/\n+/) // Split at one or more newlines
      .map((item: string) => item.trim()) // Trim whitespace from each item
      .filter((item: string) => item.length > 0); // Remove empty items

    const highestOrderResource = await this.resourceRepository
      .createQueryBuilder('resource')
      .orderBy('resource.order', 'DESC')
      .getOne();

    resourceToSave.order = highestOrderResource
      ? highestOrderResource.order + 1
      : 1;

    await this.resourceRepository.save(resourceToSave);
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

  async updateResource(
    id: number,
    resource: ResourceDTO,
    file: Express.Multer.File,
  ) {
    const resourceToSave = new Resource();

    if (file) {
      resourceToSave.imageUrl = await this.fileUploadService.uploadFile(file);
    }

    resourceToSave.heading = resource.heading;
    resourceToSave.buttonText = resource.buttonText;
    resourceToSave.linkUrl = resource.linkUrl;
    resourceToSave.target = resource.target === 'true';
    resourceToSave.bodyText = resource.bodyText
      .replace(/\r\n/g, '\n') // Replace \r\n with \n
      .split(/\n+/) // Split at one or more newlines
      .map((item: string) => item.trim()) // Trim whitespace from each item
      .filter((item: string) => item.length > 0); // Remove empty items

    const resourceToUpdate = await this.resourceRepository.findOneBy({ id });

    if (resource.imageUrl) {
      resourceToUpdate.imageUrl = resource.imageUrl;
    }

    resourceToUpdate.heading = resource.heading;
    resourceToUpdate.bodyText = resource.bodyText;
    resourceToUpdate.buttonText = resource.buttonText;
    resourceToUpdate.linkUrl = resource.linkUrl;
    resourceToUpdate.target = resource.target === 'true' ? true : false;
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
