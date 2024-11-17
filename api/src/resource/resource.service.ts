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
    // Get all resources in order of their order
    return await this.resourceRepository.find({
      order: { order: 'ASC' },
    });
  }

  async createResource(resource: ResourceDTO, file: Express.Multer.File) {
    // Create a new Resource entity
    const resourceToSave = new Resource();

    // Set the properties of the new Resource entity
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

    // Get the resource with the highest order
    const highestOrderResource = await this.resourceRepository
      .createQueryBuilder('resource')
      .orderBy('resource.order', 'DESC')
      .getOne();

    // Set the order of the new resource
    resourceToSave.order = highestOrderResource
      ? highestOrderResource.order + 1
      : 1;

    // Save the new resource
    await this.resourceRepository.save(resourceToSave);

    // Return a success message
    return { message: 'Resource created successfully' };
  }

  async updateOrder(id: number, direction: string) {
    // Get the resource to update
    const resource = await this.resourceRepository.findOneBy({ id });

    if (direction === 'up') {
      // Get the resource to swap with
      const resourceToSwap = await this.resourceRepository.findOneBy({
        order: resource.order - 1,
      });

      // Update the order of the resources
      resourceToSwap.order += 1;
      resource.order -= 1;

      // Save the updated resources
      await this.resourceRepository.save([resource, resourceToSwap]);
    } else {
      // Get the resource to swap with
      const resourceToSwap = await this.resourceRepository.findOneBy({
        order: resource.order + 1,
      });

      // Update the order of the resources
      resourceToSwap.order -= 1;
      resource.order += 1;

      // Save the updated resources
      await this.resourceRepository.save([resource, resourceToSwap]);
    }
    // Return a success message
    return { message: 'Resource order updated successfully' };
  }

  async updateResource(
    id: number,
    resource: ResourceDTO,
    file: Express.Multer.File,
  ) {
    // Create a new Resource entity
    const resourceToSave = new Resource();

    // Upload the file to S3 and set the imageUrl property, if a file was uploaded
    if (file) {
      resourceToSave.imageUrl = await this.fileUploadService.uploadFile(file);
    }

    // Set the properties of the new Resource entity
    resourceToSave.heading = resource.heading;
    resourceToSave.buttonText = resource.buttonText;
    resourceToSave.linkUrl = resource.linkUrl;
    resourceToSave.target = resource.target === 'true';
    resourceToSave.bodyText = resource.bodyText
      .replace(/\r\n/g, '\n') // Replace \r\n with \n
      .split(/\n+/) // Split at one or more newlines
      .map((item: string) => item.trim()) // Trim whitespace from each item
      .filter((item: string) => item.length > 0); // Remove empty items

    // Get the resource to update
    const resourceToUpdate = await this.resourceRepository.findOneBy({ id });

    // Update the resource to update's imageUrl, if a new imageUrl was provided
    if (resource.imageUrl) {
      resourceToUpdate.imageUrl = resource.imageUrl;
    }

    // Update the rest of the resource to update's properties
    resourceToUpdate.heading = resource.heading;
    resourceToUpdate.bodyText = resource.bodyText;
    resourceToUpdate.buttonText = resource.buttonText;
    resourceToUpdate.linkUrl = resource.linkUrl;
    resourceToUpdate.target = resource.target === 'true' ? true : false;

    // Save the updated resource
    await this.resourceRepository.save(resourceToUpdate);

    // Return a success message
    return { message: 'Resource updated successfully' };
  }

  async deleteResource(id: number) {
    // Get the resource to delete
    const resource = await this.resourceRepository.findOneBy({ id });

    // Get all resources with an order greater than the resource to delete's order
    const resources = await this.resourceRepository.find({
      where: {
        order: MoreThan(resource.order),
      },
    });

    // Decrement the order of all resources with an order greater than
    // the resource to delete's order
    resources.forEach((resource) => {
      resource.order -= 1;
    });

    // Save the updated resources
    await this.resourceRepository.save(resources);

    // Delete the resource
    await this.resourceRepository.delete(id);

    // Return a success message
    return { message: 'Resource deleted successfully' };
  }
}
