import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async getAllFeedback(submissionId: number) {
    return await this.feedbackRepository.find({
      where: { submission: { id: submissionId } },
    });
  }

  async submitFeedback(feedbackDto: any) {
    const feedback = new Feedback();
    feedback.positiveFeedback = feedbackDto.positiveFeedback;
    feedback.immediateChangesRequested = feedbackDto.immediateChangesRequested;
    feedback.longTermChangesRequested = feedbackDto.longTermChangesRequested;
    feedback.user = feedbackDto.feedbackProviderId;
    feedback.submission = feedbackDto.submissionId;
    return await this.feedbackRepository.save(feedback);
  }

  async editFeedback(feedbackDto: any) {
    const feedbackToUpdate = await this.feedbackRepository.findOne({
      where: { id: feedbackDto.id },
    });

    feedbackToUpdate.positiveFeedback = feedbackDto.positiveFeedback;
    feedbackToUpdate.immediateChangesRequested =
      feedbackDto.immediateChangesRequested;
    feedbackToUpdate.longTermChangesRequested =
      feedbackDto.longTermChangesRequested;
    return await this.feedbackRepository.save(feedbackToUpdate);
  }

  async deleteFeedback(id: number) {
    const feedbackToDelete = await this.feedbackRepository.findOne({
      where: { id },
    });
    return await this.feedbackRepository.remove(feedbackToDelete);
  }
}
