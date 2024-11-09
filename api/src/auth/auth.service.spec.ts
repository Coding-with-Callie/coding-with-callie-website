import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ReviewService } from '../review/review.service';
import { ProjectsService } from '../projects/projects.service';
import { FeaturesService } from '../features/features.service';
import { UserStoriesService } from '../userStories/userStories.service';
import { TasksService } from '../tasks/tasks.service';
import { FileUploadService } from '../file_upload/file_upload.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findOneById: jest.fn(),
    changeAccountDetail: jest.fn(),
  };

  const mockReviewService = {
    submitReview: jest.fn(),
  };

  const mockProjectsService = {
    getUserProjects: jest.fn(),
    createProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
    getProjectById: jest.fn(),
  };

  const mockFeaturesService = {
    createFeature: jest.fn(),
    updateFeature: jest.fn(),
    deleteFeature: jest.fn(),
  };

  const mockUserStoriesService = {
    createUserStory: jest.fn(),
    updateUserStory: jest.fn(),
    deleteUserStory: jest.fn(),
    getUserStoryStatusById: jest.fn(),
    getUserStoryById: jest.fn(),
  };

  const mockTasksService = {
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
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
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: FeaturesService, useValue: mockFeaturesService },
        { provide: UserStoriesService, useValue: mockUserStoriesService },
        { provide: TasksService, useValue: mockTasksService },
        { provide: FileUploadService, useValue: mockFileUploadService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
