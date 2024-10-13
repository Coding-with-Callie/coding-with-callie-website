import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private readonly speakersRepository: Repository<Speaker>,
  ) {}
  async createSpeaker(speaker: Speaker) {
    return await this.speakersRepository.save({ ...speaker });
  }

  async findAllSpeakers() {
    return await this.speakersRepository.find();
  }

  async findOneById(id: number) {
    return await this.speakersRepository.findOne({
      where: { id },
    });
  }

  async deleteSpeaker(speakerToDelete) {
    return await this.speakersRepository.delete(speakerToDelete.id);
  }

  async updateSpeaker(id: number, field: string, value: string | string[]) {
    const speakerToUpdate = await this.findOneById(id);
    speakerToUpdate[field] = value;
    return await this.speakersRepository.save(speakerToUpdate);
  }
}
