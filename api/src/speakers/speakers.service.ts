import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';
import { SpeakerDTO } from '../admin/admin.controller';

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

  async updateSpeaker(id: number, speaker: Speaker) {
    const speakerToUpdate = await this.findOneById(id);

    if (speaker.photoUrl) {
      speakerToUpdate.photoUrl = speaker.photoUrl;
    }

    speakerToUpdate.name = speaker.name;
    speakerToUpdate.date = speaker.date;
    speakerToUpdate.time = speaker.time;
    speakerToUpdate.sessionText = speaker.sessionText;
    speakerToUpdate.bioText = speaker.bioText;
    speakerToUpdate.websiteUrl = speaker.websiteUrl;
    speakerToUpdate.sessionRecordingUrl = speaker.sessionRecordingUrl;

    await this.speakersRepository.save(speakerToUpdate);
    return await this.findAllSpeakers();
  }
}
