import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ReviewService } from '../review/review.service';
import { ProjectsService } from '../projects/projects.service';
import { FeaturesService } from '../features/features.service';
import { UserStoriesService } from '../userStories/userStories.service';
import { TasksService } from '../tasks/tasks.service';
import { FileUploadService } from '../file_upload/file_upload.service';
import { ReviewDTO } from './auth.controller';
import { get } from 'http';
import { mock } from 'node:test';

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

  const mockProjectsService = {
    getUserProjects: jest.fn(),
    createProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
    getProjectById: jest.fn(),
    checkProjectOwnership: jest.fn(),
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

  it('should return a user profile', async () => {
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

    const result = await service.getUserProfile(id);
    expect(result).toEqual(user);
    expect(mockUsersService.getFrontendFriendlyUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.getFrontendFriendlyUser).toHaveBeenCalledWith(id);
  });

  it('should call changeAccountDetail in user service', async () => {
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

  it('should call softDeleteUser in user service', async () => {
    const id = 1;

    mockUsersService.softDeleteUser.mockResolvedValue('user deleted');

    const result = await service.deleteUser(id);
    expect(result).toEqual('user deleted');
    expect(mockUsersService.softDeleteUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.softDeleteUser).toHaveBeenCalledWith(id);
  });

  it('should call uploadFile in file upload service', async () => {
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

  it('should call submitReview in review service', async () => {
    const review: ReviewDTO = {
      rating: 5,
      comments: 'Great project!',
      displayName: 'Callie Stoscup',
      userId: 1,
    };

    mockReviewService.submitReview.mockResolvedValue({
      message: 'Review submitted successfully',
    });
    mockReviewService.getAllReviews.mockResolvedValue([review]);

    const result = await service.submitReviewAndReturnUpdatedReviews(review);
    expect(result).toEqual([review]);
    expect(mockReviewService.submitReview).toHaveBeenCalledTimes(1);
    expect(mockReviewService.submitReview).toHaveBeenCalledWith(review);
    expect(mockReviewService.getAllReviews).toHaveBeenCalledTimes(1);
  });

  it('should call getUserProjects in project service', async () => {
    const userId = 1;
    const projects = [];

    mockProjectsService.getUserProjects.mockResolvedValue(projects);

    const result = await service.getUserProjects(userId);
    expect(result).toEqual(projects);
    expect(mockProjectsService.getUserProjects).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getUserProjects).toHaveBeenCalledWith(userId);
  });

  it('should call getProject in project service', async () => {
    const id = 1;
    const project = {
      id,
      name: 'Project 1',
      description: 'Description 1',
      features: [],
    };

    mockProjectsService.getProjectById.mockResolvedValue(project);

    const result = await service.getProject(id);
    expect(result).toEqual(project);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(id);
  });

  it('should call createProject in project service', async () => {
    const name = 'Project 1';
    const description = 'Description 1';
    const userId = 1;
    const projects = [{ id: 1, name, description, features: [] }];

    mockProjectsService.createProject.mockResolvedValue({
      message: 'Project created',
    });
    mockProjectsService.getUserProjects.mockResolvedValue(projects);

    const result = await service.createProjectAndReturnUpdatedProjects(
      name,
      description,
      userId,
    );
    expect(result).toEqual(projects);
    expect(mockProjectsService.createProject).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.createProject).toHaveBeenCalledWith(
      name,
      description,
      userId,
    );
  });

  it('should call updateProject in project service and return updated project', async () => {
    const field = 'name';
    const value = 'Project 1 EDITED';
    const projectId = 1;

    const updatedProject = {
      id: 1,
      name: 'Project 1 EDITED',
      description: '',
      features: [],
    };
    mockProjectsService.updateProject.mockResolvedValue({
      message: 'Project updated',
    });
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.updateProjectAndReturnUpdatedProject(
      field,
      value,
      projectId,
    );
    expect(result).toEqual(updatedProject);
    expect(mockProjectsService.updateProject).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.updateProject).toHaveBeenCalledWith(
      field,
      value,
      projectId,
    );
  });

  it('should call deleteProject in project service', async () => {
    const projectId = 1;

    mockProjectsService.deleteProject.mockResolvedValue({
      message: 'Project deleted',
    });

    const result = await service.deleteProject(projectId);
    expect(result).toEqual({ message: 'Project deleted' });
    expect(mockProjectsService.deleteProject).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.deleteProject).toHaveBeenCalledWith(projectId);
  });

  it('should call createFeature in feature service and getProjectById in project service', async () => {
    const name = 'Feature 1';
    const description = 'Description 1';
    const projectId = 1;

    const updatedProject = {
      id: 1,
      name: 'Project 1',
      description: '',
      features: [{ id: 1, name: 'Feature 1', description: '' }],
    };

    mockFeaturesService.createFeature.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.createFeatureAndReturnUpdatedProject(
      name,
      description,
      projectId,
    );
    expect(result).toEqual(updatedProject);
    expect(mockFeaturesService.createFeature).toHaveBeenCalledTimes(1);
    expect(mockFeaturesService.createFeature).toHaveBeenCalledWith(
      name,
      description,
      projectId,
    );
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });
});
