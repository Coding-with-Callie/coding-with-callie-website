import { Injectable } from '@nestjs/common';
import { ResourceService } from '../resource/resource.service';
import { ResourceDTO, SpeakerDTO } from './admin.controller';
import { SpeakersService } from '../speakers/speakers.service';
import { SectionsService } from '../sections/sections.service';

@Injectable()
export class AdminService {
  constructor(
    private resourceService: ResourceService,
    private speakersService: SpeakersService,
    private sectionsService: SectionsService,
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
    // await this.resourceService.updateResource(id, resource, file);

    // Update the section
    await this.sectionsService.updateSection(id, resource, file);

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

  async createSpeakerAndReturnUpdatedSpeakers(
    speaker: SpeakerDTO,
    file: Express.Multer.File,
  ) {
    // Create the speaker
    await this.speakersService.createSpeaker(speaker, file);

    // Return the updated speakers
    return await this.speakersService.getSpeakers();
  }

  async deleteSpeakerAndReturnUpdatedSpeakers(id: number) {
    // Delete the speaker
    await this.speakersService.deleteSpeaker(id);

    // Return the updated speakers
    return await this.speakersService.getSpeakers();
  }

  async updateSpeakerAndReturnUpdatedSpeakers(
    id: number,
    speaker: SpeakerDTO,
    file: Express.Multer.File,
  ) {
    // Update the speaker
    await this.speakersService.updateSpeaker(id, speaker, file);

    // Return the updated speakers
    return await this.speakersService.getSpeakers();
  }
}
