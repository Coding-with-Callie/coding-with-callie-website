import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './entities/speaker.entity';
import { SpeakerDTO } from '../admin/admin.controller';
import { FileUploadService } from '../file_upload/file_upload.service';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker)
    private readonly speakersRepository: Repository<Speaker>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async createSpeaker(speaker: SpeakerDTO, file: Express.Multer.File) {
    // Create a new Speaker entity
    const speakerToSave = new Speaker();

    // Upload speaker photo to S3 and set photoUrl
    speakerToSave.photoUrl = await this.fileUploadService.uploadFile(file);

    // Set the rest of the speaker's properties
    speakerToSave.bioText = speaker.bioText
      .replace(/\r\n/g, '\n') // Replace \r\n with \n
      .split(/\n+/) // Split at one or more newlines
      .map((item: string) => item.trim()) // Trim whitespace from each item
      .filter((item: string) => item.length > 0); // Remove empty items

    speakerToSave.sessionText = speaker.sessionText
      .replace(/\r\n/g, '\n') // Replace \r\n with \n
      .split(/\n+/) // Split at one or more newlines
      .map((item: string) => item.trim()) // Trim whitespace from each item
      .filter((item: string) => item.length > 0); // Remove empty items

    speakerToSave.name = speaker.name;
    speakerToSave.date = speaker.date;
    speakerToSave.websiteUrl = speaker.websiteUrl;

    if (speaker.sessionRecordingUrl) {
      speakerToSave.sessionRecordingUrl = speaker.sessionRecordingUrl;
    }

    // Save the speaker
    await this.speakersRepository.save(speakerToSave);

    // Return a success message
    return { message: 'Speaker created successfully' };
  }

  async getSpeakers() {
    // Get all speakers
    const speakers = await this.speakersRepository.find();

    // Sort speakers into upcoming and past
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

    // Sort past speakers by date
    pastSpeakers.sort((a, b) => {
      // Sort in descending order
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Sort upcoming speakers by date
    upcomingSpeakers.sort((a, b) => {
      // Sort in ascending order
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Return upcoming and past speakers
    return { upcomingSpeakers, pastSpeakers };
  }

  async findOneById(id: number) {
    return await this.speakersRepository.findOne({
      where: { id },
    });
  }

  async deleteSpeaker(speakerToDelete) {
    // Delete the speaker
    await this.speakersRepository.delete(speakerToDelete.id);

    // Return a success message
    return { message: 'Speaker deleted successfully' };
  }

  async updateSpeaker(id: number, speaker: Speaker) {
    // Get the speaker to update
    const speakerToUpdate = await this.findOneById(id);

    // Update the speaker to update's photoUrl, if a new photoUrl was provided
    if (speaker.photoUrl) {
      speakerToUpdate.photoUrl = speaker.photoUrl;
    }

    // Update the rest of the speaker to update's properties
    speakerToUpdate.name = speaker.name;
    speakerToUpdate.date = speaker.date;
    speakerToUpdate.time = speaker.time;
    speakerToUpdate.sessionText = speaker.sessionText;
    speakerToUpdate.bioText = speaker.bioText;
    speakerToUpdate.websiteUrl = speaker.websiteUrl;
    speakerToUpdate.sessionRecordingUrl = speaker.sessionRecordingUrl;

    // Save the updated speaker
    await this.speakersRepository.save(speakerToUpdate);

    // Return a success message
    return { message: 'Speaker updated successfully' };
  }
}
