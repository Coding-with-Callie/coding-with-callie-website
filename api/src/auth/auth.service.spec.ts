import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ReviewService } from '../review/review.service';
import { FileUploadService } from '../file_upload/file_upload.service';
import { ReviewDTO } from './auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    getFrontendFriendlyUser: jest.fn(),
    changeAccountDetail: jest.fn(),
    softDeleteUser: jest.fn(),
  };

  const mockReviewService = {
    submitReview: jest.fn(),
    getAllReviews: jest.fn(),
  };

  const mockFileUploadService = {
    uploadFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: ReviewService, useValue: mockReviewService },
        { provide: FileUploadService, useValue: mockFileUploadService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getFrontendFriendlyUser in user service return a user profile', async () => {
    const id = 1;
    const user = {
      id,
      name: 'Callie Stoscup',
      email: 'calliestoscup@gmail.com',
      username: 'calliestoscup',
      role: 'admin',
      photo: 'photourl.com',
    };

    mockUsersService.getFrontendFriendlyUser.mockResolvedValue(user);

    const result = await service.getFrontendFriendlyUser(id);
    expect(result).toEqual(user);
    expect(mockUsersService.getFrontendFriendlyUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.getFrontendFriendlyUser).toHaveBeenCalledWith(id);
  });

  it('should call changeAccountDetail in user service and return an updated user', async () => {
    const id = 1;
    const field = 'name';
    const value = 'EDITED NAME';

    const returnedUser = {
      id,
      name: 'EDITED NAME',
      email: 'calliestoscup@gmail.com',
      username: 'calliestoscup',
      role: 'admin',
      photo: 'photourl.com',
    };

    mockUsersService.changeAccountDetail.mockResolvedValue(returnedUser);

    const result = await service.changeAccountDetail(id, field, value);
    expect(result).toEqual(returnedUser);
    expect(mockUsersService.changeAccountDetail).toHaveBeenCalledTimes(1);
    expect(mockUsersService.changeAccountDetail).toHaveBeenCalledWith(
      id,
      field,
      value,
    );
  });

  it('should call softDeleteUser in user service and return a success message', async () => {
    const id = 1;

    mockUsersService.softDeleteUser.mockResolvedValue('user deleted');

    const result = await service.softDeleteUser(id);
    expect(result).toEqual('user deleted');
    expect(mockUsersService.softDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.softDeleteUser).toHaveBeenCalledWith(id);
  });

  it('should call uploadFile in file upload service and return a photoUrl', async () => {
    const file = {} as Express.Multer.File;

    const photoUrl = 'photourl.com';
    mockFileUploadService.uploadFile.mockResolvedValue(photoUrl);

    const result = await service.uploadFile(file);
    expect(result).toEqual(photoUrl);
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(1);
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledWith(file);
  });

  it('should call changeAccountDetail in user service with photoUrl', async () => {
    const id = 1;
    const file = {} as Express.Multer.File;

    const returnedUser = {
      id,
      name: 'Callie Stoscup',
      email: 'calliestoscup@gmail.com',
      username: 'calliestoscup',
      role: 'admin',
      photo: 'photourl.com',
    };

    mockFileUploadService.uploadFile.mockResolvedValue('photourl.com');
    mockUsersService.changeAccountDetail.mockResolvedValue(returnedUser);

    const result = await service.uploadProfileImage(id, file);
    expect(result).toEqual(returnedUser);
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledTimes(1);
    expect(mockFileUploadService.uploadFile).toHaveBeenCalledWith(file);
    expect(mockUsersService.changeAccountDetail).toHaveBeenCalledTimes(1);
    expect(mockUsersService.changeAccountDetail).toHaveBeenCalledWith(
      id,
      'photo',
      'photourl.com',
    );
  });

  it('should call submitReview and getAllReviews in review service and return all reviews', async () => {
    const review: ReviewDTO = {
      rating: 5,
      comments: 'Great project!',
      displayName: 'Callie Stoscup',
    };
    const userId = 1;

    mockReviewService.submitReview.mockResolvedValue({
      message: 'Review submitted successfully',
    });
    mockReviewService.getAllReviews.mockResolvedValue([review]);

    const result = await service.submitReviewAndReturnUpdatedReviews(
      review,
      userId,
    );
    expect(result).toEqual([review]);
    expect(mockReviewService.submitReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.submitReview).toHaveBeenCalledWith(review, userId);
    expect(mockReviewService.getAllReviews).toHaveBeenCalledTimes(1);
  });
});
