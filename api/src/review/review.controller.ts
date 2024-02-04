import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reviews')
  async getReviews() {
    return await this.reviewService.getAllReviews();
  }
}
