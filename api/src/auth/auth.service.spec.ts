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
import { Project } from '../projects/entities/project.entity';

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
    checkIfFeatureExistsInProject: jest.fn(),
  };

  const mockUserStoriesService = {
    createUserStory: jest.fn(),
    updateUserStory: jest.fn(),
    deleteUserStory: jest.fn(),
    getUserStoryStatusById: jest.fn(),
    getUserStoryById: jest.fn(),
    checkIfUserStoryExistsInFeatureInProject: jest.fn(),
  };

  const mockTasksService = {
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    getUserStoryTasks: jest.fn(),
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

  it('should call getUserProjects in project service and return all user projects', async () => {
    const userId = 1;
    const projects = [];

    mockProjectsService.getUserProjects.mockResolvedValue(projects);

    const result = await service.getUserProjects(userId);
    expect(result).toEqual(projects);
    expect(mockProjectsService.getUserProjects).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getUserProjects).toHaveBeenCalledWith(userId);
  });

  it('should call getProject in project service and return a project', async () => {
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

  it('should call createProject and getUserProjects in project service and return all user projects', async () => {
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
    expect(mockProjectsService.getUserProjects).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getUserProjects).toHaveBeenCalledWith(userId);
  });

  it('should call updateProject and getProject in project service and return updated project', async () => {
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
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });

  it('should call deleteProject in project service and return a success message', async () => {
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

  it('should call updateFeature in feature service and getProjectById in project service', async () => {
    const field = 'name';
    const value = 'Feature 1 EDITED';
    const projectId = 1;
    const featureId = 1;

    const updatedProject = {
      id: 1,
      name: 'Project 1',
      description: '',
      features: [{ id: 1, name: 'Feature 1 EDITED', description: '' }],
    };

    mockFeaturesService.updateFeature.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.updateFeatureAndReturnUpdatedProject(
      field,
      value,
      projectId,
      featureId,
    );
    expect(result).toEqual(updatedProject);
    expect(mockFeaturesService.updateFeature).toHaveBeenCalledTimes(1);
    expect(mockFeaturesService.updateFeature).toHaveBeenCalledWith(
      field,
      value,
      featureId,
    );
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(1);
  });

  it('should call deleteFeature in feature service and getProjectById in project service', async () => {
    const featureId = 1;
    const projectId = 1;

    const updatedProject = {
      id: 1,
      name: 'Project 1',
      description: '',
      features: [],
    };

    mockFeaturesService.deleteFeature.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result =
      await service.deleteFeatureAndReturnUpdatedProject(featureId);
    expect(result).toEqual(updatedProject);
    expect(mockFeaturesService.deleteFeature).toHaveBeenCalledTimes(1);
    expect(mockFeaturesService.deleteFeature).toHaveBeenCalledWith(featureId);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });

  it('should call checkIfFeatureExistsInProject in feature service, createUserStory in user story service and getProjectById in project service', async () => {
    const name = 'User Story 1';
    const description = 'Description 1';
    const projectId = 1;
    const featureId = 1;

    const updatedProject = {} as Project;

    mockFeaturesService.checkIfFeatureExistsInProject.mockResolvedValue(true);
    mockUserStoriesService.createUserStory.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.createUserStoryAndReturnUpdatedProject(
      name,
      description,
      projectId,
      featureId,
    );
    expect(result).toEqual(updatedProject);
    expect(
      mockFeaturesService.checkIfFeatureExistsInProject,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockFeaturesService.checkIfFeatureExistsInProject,
    ).toHaveBeenCalledWith(featureId, projectId);
    expect(mockUserStoriesService.createUserStory).toHaveBeenCalledTimes(1);
    expect(mockUserStoriesService.createUserStory).toHaveBeenCalledWith(
      name,
      description,
      featureId,
    );
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });

  it('should call checkIfFeatureExistsInProject in feature service and throw an error if feature does not exist', async () => {
    const name = 'User Story 1';
    const description = 'Description 1';
    const projectId = 1;
    const featureId = 1;

    mockFeaturesService.checkIfFeatureExistsInProject.mockResolvedValue(false);

    await expect(
      service.createUserStoryAndReturnUpdatedProject(
        name,
        description,
        projectId,
        featureId,
      ),
    ).rejects.toThrowError('Feature does not exist in project');
    expect(
      mockFeaturesService.checkIfFeatureExistsInProject,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockFeaturesService.checkIfFeatureExistsInProject,
    ).toHaveBeenCalledWith(featureId, projectId);
    expect(mockUserStoriesService.createUserStory).not.toHaveBeenCalled();
    expect(mockProjectsService.getProjectById).not.toHaveBeenCalled();
  });

  it('should call updateUserStory in user story service and getProjectById in project service', async () => {
    const field = 'name';
    const value = 'User Story 1 EDITED';
    const userStoryId = 1;
    const projectId = 1;

    const updatedProject = {} as Project;

    mockUserStoriesService.updateUserStory.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.updateUserStoryAndReturnUpdatedProject(
      field,
      value,
      userStoryId,
      projectId,
    );
    expect(result).toEqual(updatedProject);
    expect(mockUserStoriesService.updateUserStory).toHaveBeenCalledTimes(1);
    expect(mockUserStoriesService.updateUserStory).toHaveBeenCalledWith(
      field,
      value,
      userStoryId,
    );
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });

  it('should call deleteUserStory in user story service and getProjectById in project service', async () => {
    const userStoryId = 1;
    const projectId = 1;

    const updatedProject = {} as Project;

    mockUserStoriesService.deleteUserStory.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.deleteUserStoryAndReturnUpdatedProject(
      userStoryId,
      projectId,
    );
    expect(result).toEqual(updatedProject);
    expect(mockUserStoriesService.deleteUserStory).toHaveBeenCalledTimes(1);
    expect(mockUserStoriesService.deleteUserStory).toHaveBeenCalledWith(
      userStoryId,
    );
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });

  it('should call checkIfUserStoryExistsInFeatureInProject in user story service, createTask in task service and getProjectById in project service', async () => {
    const name = 'Task 1';
    const projectId = 1;
    const featureId = 1;
    const userStoryId = 1;

    const updatedProject = {} as Project;

    mockUserStoriesService.checkIfUserStoryExistsInFeatureInProject.mockResolvedValue(
      true,
    );
    mockTasksService.createTask.mockResolvedValue({});
    mockProjectsService.getProjectById.mockResolvedValue(updatedProject);

    const result = await service.createTaskAndReturnUpdatedProject(
      name,
      projectId,
      featureId,
      userStoryId,
    );
    expect(result).toEqual(updatedProject);
    expect(
      mockUserStoriesService.checkIfUserStoryExistsInFeatureInProject,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockUserStoriesService.checkIfUserStoryExistsInFeatureInProject,
    ).toHaveBeenCalledWith(userStoryId, featureId, projectId);
    expect(mockTasksService.createTask).toHaveBeenCalledTimes(1);
    expect(mockTasksService.createTask).toHaveBeenCalledWith(name, userStoryId);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(projectId);
  });

  it('should call checkIfUserStoryExistsInFeatureInProject in user story service and throw an error if user story does not exist', async () => {
    const name = 'Task 1';
    const projectId = 1;
    const featureId = 1;
    const userStoryId = 1;

    mockUserStoriesService.checkIfUserStoryExistsInFeatureInProject.mockResolvedValue(
      false,
    );

    await expect(
      service.createTaskAndReturnUpdatedProject(
        name,
        projectId,
        featureId,
        userStoryId,
      ),
    ).rejects.toThrow('User story does not exist in feature in project');
    expect(
      mockUserStoriesService.checkIfUserStoryExistsInFeatureInProject,
    ).toHaveBeenCalledTimes(1);
    expect(
      mockUserStoriesService.checkIfUserStoryExistsInFeatureInProject,
    ).toHaveBeenCalledWith(userStoryId, featureId, projectId);
    expect(mockTasksService.createTask).not.toHaveBeenCalled();
    expect(mockProjectsService.getProjectById).not.toHaveBeenCalled();
  });

  it('should call updateTask in task service and getUserStoryStatusById', async () => {
    const field = 'name';
    const value = 'Task 1 EDITED';
    const taskId = 1;
    const userStoryId = 1;

    mockTasksService.updateTask.mockResolvedValue({});
    mockUserStoriesService.getUserStoryStatusById.mockResolvedValue('1/5');

    const result = await service.updateTaskAndReturnTaskCompletionRatio(
      field,
      value,
      taskId,
      userStoryId,
    );

    expect(result).toEqual('1/5');
    expect(mockTasksService.updateTask).toHaveBeenCalledTimes(1);
    expect(mockTasksService.updateTask).toHaveBeenCalledWith(
      field,
      value,
      taskId,
    );
    expect(mockUserStoriesService.getUserStoryStatusById).toHaveBeenCalledTimes(
      1,
    );
    expect(mockUserStoriesService.getUserStoryStatusById).toHaveBeenCalledWith(
      taskId,
    );
  });

  it('should call deleteTask and getUserStoryTasks in task service and getUserStoryStatusById in user stories service', async () => {
    const taskId = 1;
    const userStoryId = 1;

    mockTasksService.deleteTask.mockResolvedValue({});
    mockUserStoriesService.getUserStoryStatusById.mockResolvedValue('1/5');

    const result =
      await service.deleteTaskAndReturnUpdatedTasksWithTaskCompletionRatio(
        taskId,
        userStoryId,
      );

    expect(result).toEqual({ storyStatus: '1/5', taskList: undefined });
    expect(mockTasksService.deleteTask).toHaveBeenCalledTimes(1);
    expect(mockTasksService.deleteTask).toHaveBeenCalledWith(taskId);
    expect(mockUserStoriesService.getUserStoryStatusById).toHaveBeenCalledTimes(
      1,
    );
    expect(mockUserStoriesService.getUserStoryStatusById).toHaveBeenCalledWith(
      userStoryId,
    );
  });
});
