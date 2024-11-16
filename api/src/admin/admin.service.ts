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
  async createResource(resource: ResourceDTO, file: Express.Multer.File) {
    return await this.resourceService.createResource(resource, file);
  }

  async deleteResource(id: number) {
    return await this.resourceService.deleteResource(id);
  }

  async updateResource(
    id: number,
    resource: ResourceDTO,
    file: Express.Multer.File,
  ) {
    return await this.resourceService.updateResource(id, resource, file);
  }

  async updateResourceOrder(id: number, direction: string) {
    return await this.resourceService.updateOrder(id, direction);
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
