import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Workshop } from 'src/workshops/entities/workshop.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getAllReviews() {
    return await this.reviewRepository.find({
      relations: ['user'],
    });
  }

  async findReview(userId, session) {
    return await this.reviewRepository.find({
      where: {
        user: {
          id: userId,
        },
        session,
      },
    });
  }

  async submitReview(review: any, workshop: Workshop) {
    const result = new Review();
    result.rating = review.rating;
    result.workshop = workshop;
    result.session = review.session;
    result.comments = review.comments;
    result.displayName = review.displayName;
    result.user = review.userId;

    await this.reviewRepository.save(result);

    return await this.getAllReviews();
  }
}
