import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';

describe('ReviewService', () => {
  let service: ReviewService;

  const mockReviewRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call find method of reviewRepository', async () => {
    const reviews = [] as Review[];
    mockReviewRepository.find.mockReturnValue(reviews);

    const result = await service.getAllReviews();
    expect(result).toEqual(reviews);
    expect(mockReviewRepository.find).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.find).toHaveBeenCalledWith({
      relations: ['user'],
      order: {
        id: 'ASC',
      },
    });
  });

  it('should call find method of reviewRepository and return a review', async () => {
    const review = {
      userId: 1,
      rating: 5,
      comments: 'Great',
      displayName: 'John',
    };
    mockReviewRepository.find.mockReturnValue(review);

    const result = await service.findReview(1);
    expect(result).toEqual(review);
    expect(mockReviewRepository.find).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.find).toHaveBeenCalledWith({
      where: {
        user: {
          id: 1,
        },
      },
    });
  });

  it('should call save method of reviewRepository and return a success message', async () => {
    const review = {
      userId: 1,
      rating: 5,
      comments: 'Great',
      displayName: 'John',
    };

    const result = await service.submitReview(review);
    expect(result).toEqual({ message: 'Review submitted successfully.' });
    expect(mockReviewRepository.save).toHaveBeenCalledTimes(1);
    expect(mockReviewRepository.save).toHaveBeenCalledWith(review);
  });
});
