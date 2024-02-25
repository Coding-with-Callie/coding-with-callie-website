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
}
