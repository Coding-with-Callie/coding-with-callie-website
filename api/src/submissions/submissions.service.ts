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

  async getSubmissionWithId(id: number) {
    return await this.submissionsRepository.find({
      where: { id },
    });
  }

  async getUserWithSubmissionId(submissionId: number) {
    return await this.submissionsRepository.find({
      where: { id: submissionId },
      relations: ['user', 'feedback'],
    });
  }

  async getSubmissionsCountBySession(id) {
    const submissions = await this.submissionsRepository.find({
      where: { workshop: { id } },
    });
    const countedSubmissions = {};
    submissions.forEach((submission: Submissions) => {
      const sessionId = submission.session;
      if (countedSubmissions[sessionId]) {
        countedSubmissions[sessionId] += 1;
      } else {
        countedSubmissions[sessionId] = 1;
      }
    });
    return countedSubmissions;
  }

  async getAllSubmissions(workshopId: number, sessionId: number) {
    return await this.submissionsRepository.find({
      where: { session: sessionId, workshop: { id: workshopId } },
      relations: ['feedback'],
    });
  }

  async submitDeliverable(deliverable: any) {
    const submission = new Submissions();
    submission.session = deliverable.session;
    submission.url = deliverable.url;
    submission.user = deliverable.userId;
    submission.workshop = deliverable.workshopId;
    return await this.submissionsRepository.save(submission);
  }

  async editDeliverable(deliverable: any) {
    const deliverableToUpdate = await this.submissionsRepository.findOne({
      where: {
        session: deliverable.session,
        user: { id: deliverable.userId },
      },
    });

    deliverableToUpdate.url = deliverable.url;

    return await this.submissionsRepository.save(deliverableToUpdate);
  }

  async deleteSubmission(id: number) {
    const submissionToDelete = await this.submissionsRepository.findOne({
      where: { id },
    });

    return await this.submissionsRepository.remove(submissionToDelete);
  }
}
