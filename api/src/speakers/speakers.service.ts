import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';
import { SpeakerDTO } from 'src/auth/auth.controller';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private readonly speakersRepository: Repository<Speaker>,
  ) {}
  async createSpeaker(speaker: SpeakerDTO) {
    await this.speakersRepository.save(speaker);
    return await this.findAllSpeakers();
  }

  async findAllSpeakers() {
    const speakers = await this.speakersRepository.find();

    const { upcomingSpeakers, pastSpeakers } = speakers.reduce(
      (
        acc: { upcomingSpeakers: Speaker[]; pastSpeakers: Speaker[] },
        speaker: Speaker,
      ) => {
        const date = new Date(speaker.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date >= today) {
          acc.upcomingSpeakers.push(speaker);
        } else {
          acc.pastSpeakers.push(speaker);
        }

        return acc;
      },
      { upcomingSpeakers: [], pastSpeakers: [] },
    );

    pastSpeakers.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    upcomingSpeakers.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return { upcomingSpeakers, pastSpeakers };
  }

  async findOneById(id: number) {
    return await this.speakersRepository.findOne({
      where: { id },
    });
  }

  async deleteSpeaker(speakerToDelete) {
    await this.speakersRepository.delete(speakerToDelete.id);
    return await this.findAllSpeakers();
  }

  async updateSpeaker(id: number, field: string, value: string | string[]) {
    const speakerToUpdate = await this.findOneById(id);
    speakerToUpdate[field] = value;
    await this.speakersRepository.save(speakerToUpdate);
    return await this.findAllSpeakers();
  }
}
