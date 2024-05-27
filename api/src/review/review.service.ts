import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

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

  async findReview(userId) {
    return await this.reviewRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async submitReview(review: any) {
    const result = new Review();
    result.rating = review.rating;
    result.comments = review.comments;
    result.displayName = review.displayName;
    result.user = review.userId;

    await this.reviewRepository.save(result);

    return await this.getAllReviews();
  }
}
