import { Injectable } from '@nestjs/common';
import { FileUploadService } from '../file_upload/file_upload.service';
import { Resource } from '../resource/entities/resource.entity';
import { ResourceService } from '../resource/resource.service';
import { SpeakerDTO } from './admin.controller';
import { Speaker } from '../speakers/entities/speaker.entity';
import { SpeakersService } from '../speakers/speakers.service';

@Injectable()
export class AdminService {
  constructor(
    private fileUploadService: FileUploadService,
    private resourceService: ResourceService,
    private speakersService: SpeakersService,
  ) {}

  async uploadFile(file) {
    return await this.fileUploadService.uploadFile(file);
  }

  async createResource(resource: Resource) {
    return await this.resourceService.createResource(resource);
  }

  async deleteResource(id: number) {
    return await this.resourceService.deleteResource(id);
  }

  async updateResource(id: number, resource: Resource) {
    return await this.resourceService.updateResource(id, resource);
  }

  async updateResourceOrder(id: number, direction: string) {
    return await this.resourceService.updateOrder(id, direction);
  }

  async createSpeaker(speaker: SpeakerDTO) {
    return await this.speakersService.createSpeaker(speaker);
  }

  async deleteSpeaker(id: number) {
    const speaker = await this.speakersService.findOneById(id);
    return await this.speakersService.deleteSpeaker(speaker);
  }

  async updateSpeaker(id: number, speaker: Speaker) {
    return await this.speakersService.updateSpeaker(id, speaker);
  }
}
