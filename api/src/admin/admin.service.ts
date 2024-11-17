import { Injectable } from '@nestjs/common';
import { ResourceService } from '../resource/resource.service';
import { ResourceDTO, SpeakerDTO } from './admin.controller';
import { Speaker } from '../speakers/entities/speaker.entity';
import { SpeakersService } from '../speakers/speakers.service';

@Injectable()
export class AdminService {
  constructor(
    private resourceService: ResourceService,
    private speakersService: SpeakersService,
  ) {}
  async createResourceAndReturnUpdatedResources(
    resource: ResourceDTO,
    file: Express.Multer.File,
  ) {
    // Create the resource
    await this.resourceService.createResource(resource, file);

    // Return the updated resources
    return await this.resourceService.getResources();
  }

  async deleteResourceAndReturnUpdatedResources(id: number) {
    // Delete the resource
    await this.resourceService.deleteResource(id);

    // Return the updated resources
    return await this.resourceService.getResources();
  }

  async updateResourceAndReturnUpdatedResources(
    id: number,
    resource: ResourceDTO,
    file: Express.Multer.File,
  ) {
    // Update the resource
    await this.resourceService.updateResource(id, resource, file);

    // Return the updated resources
    return await this.resourceService.getResources();
  }

  async updateResourceOrderAndReturnUpdatedResources(
    id: number,
    direction: string,
  ) {
    // Update the order of the resource
    await this.resourceService.updateOrder(id, direction);

    // Return the updated resources
    return await this.resourceService.getResources();
  }

  async createSpeaker(speaker: SpeakerDTO, file: Express.Multer.File) {
    return await this.speakersService.createSpeaker(speaker, file);
  }

  async deleteSpeaker(id: number) {
    const speaker = await this.speakersService.findOneById(id);
    return await this.speakersService.deleteSpeaker(speaker);
  }

  async updateSpeaker(id: number, speaker: Speaker) {
    return await this.speakersService.updateSpeaker(id, speaker);
  }
}
