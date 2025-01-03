import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ReviewDTO } from '../auth/auth.controller';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getAllReviews() {
    return await this.reviewRepository.find({
      relations: ['user'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findReview(userId: number) {
    return await this.reviewRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async submitReview(review: ReviewDTO, userId: number) {
    await this.reviewRepository.save({ ...review, user: { id: userId } });
    return { message: 'Review submitted successfully.' };
  }
}
