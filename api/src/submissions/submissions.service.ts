import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submissions } from './entities/submissions.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submissions)
    private readonly submissionsRepository: Repository<Submissions>,
  ) {}

  async getUserSubmissions(userId: number) {
    const submissions = await this.submissionsRepository.find({
      where: { user: { id: userId } },
      relations: ['feedback'],
    });

    if (submissions) {
      return submissions;
    } else {
      return [];
    }
  }

  async getAllSubmissions(sessionId: number) {
    return await this.submissionsRepository.find({
      where: { session: sessionId },
      relations: ['feedback'],
    });
  }

  async submitDeliverable(deliverable: any) {
    const submission = new Submissions();
    submission.session = deliverable.session;
    submission.url = deliverable.url;
    submission.user = deliverable.userId;
    return await this.submissionsRepository.save(submission);
  }
}
