import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserStoriesService } from './userStories.service';
import { UserStory } from './entities/userStory.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserStoriesService', () => {
  let service: UserStoriesService;

  const mockUserStoriesRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserStoriesService,
        {
          provide: getRepositoryToken(UserStory),
          useValue: mockUserStoriesRepository,
        },
      ],
    }).compile();

    service = module.get<UserStoriesService>(UserStoriesService);
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getFeatureUserStories => should find user stories corresponding to a feature id', async () => {
    const id = 3;
    const userStories = [
      {
        id: 11,
        name: 'User Story 11',
        description: 'us description 11',
        feature: {
          id: 3,
        },
      },
      {
        id: 12,
        name: 'User Story 12',
        description: 'us description 12',
        feature: {
          id: 3,
        },
      },
    ] as UserStory[];

    jest.spyOn(mockUserStoriesRepository, 'find').mockReturnValue(userStories);

    const result = await service.getFeatureUserStories(id);

    expect(result).toEqual(userStories);
    expect(mockUserStoriesRepository.find).toHaveBeenCalled();
    expect(mockUserStoriesRepository.find).toHaveBeenCalledWith({
      where: { feature: { id } },
    });
  });

  it('createUserStory => save the user story that is passed in and return the list of user stories for the feature id that was passed in', async () => {
    const name = 'User Story 13';
    const description = 'us description 13';
    const featureId = 3;

    const savedUserStory = {} as UserStory;

    mockUserStoriesRepository.save.mockReturnValue(savedUserStory);

    const result = await service.createUserStory(name, description, featureId);

    expect(result).toEqual({ message: 'User story created' });
    expect(mockUserStoriesRepository.save).toHaveBeenCalled();
    expect(mockUserStoriesRepository.save).toHaveBeenCalledWith({
      name,
      description,
      feature: {
        id: featureId,
      },
    });
  });

  it('getUserStoryById => returns a user story from an inputted user story id', async () => {
    const id = 1;
    const userStory = {
      id: 1,
      name: 'User Story 1',
      description: 'us 1 description',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          status: 'To Do',
        },
      ],
    } as UserStory;

    jest.spyOn(mockUserStoriesRepository, 'findOne').mockReturnValue(userStory);

    const result = await service.getUserStoryById(id);

    expect(result).toEqual(userStory);
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['tasks'],
    });
  });

  it('getUserStoryStatusById => returns the number of completed tasks out of the total number of tasks for a given user story id', async () => {
    const id = 1;
    const userStory = {
      id: 1,
      name: 'User Story 1',
      description: 'us 1 description',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          status: 'To Do',
        },
        {
          id: 2,
          name: 'Task 2',
          status: 'In Progress',
        },
        {
          id: 3,
          name: 'Task 3',
          status: 'Done!',
        },
        {
          id: 4,
          name: 'Task 4',
          status: 'Done!',
        },
        {
          id: 5,
          name: 'Task 5',
          status: 'To Do',
        },
      ],
    } as UserStory;

    jest.spyOn(mockUserStoriesRepository, 'findOne').mockReturnValue(userStory);

    const result = await service.getUserStoryStatusById(id);

    expect(result).toEqual('2/5');
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['tasks'],
    });
  });

  it('updateUserStory => updates a user story name and returns the associated project id', async () => {
    const field = 'name';
    const value = 'User Story 11 - Edited';
    const userStoryId = 11;

    const storyToUpdate = {
      id: 11,
      name: 'User Story 11',
      description: 'us 11 description',
      feature: {
        id: 4,
        project: {
          id: 2,
        },
      },
    } as UserStory;

    const updatedStory = {
      id: 11,
      name: 'User Story 11 - Edited',
      description: 'us 11 description',
      feature: {
        id: 4,
        project: {
          id: 2,
        },
      },
    } as UserStory;

    jest
      .spyOn(mockUserStoriesRepository, 'findOne')
      .mockReturnValue(storyToUpdate);
    jest.spyOn(mockUserStoriesRepository, 'save').mockReturnValue(updatedStory);

    const result = await service.updateUserStory(field, value, userStoryId);

    expect(result).toEqual({ message: 'User story updated' });
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: userStoryId,
      },
      relations: ['feature', 'feature.project'],
    });
    expect(mockUserStoriesRepository.save).toHaveBeenCalled();
    expect(mockUserStoriesRepository.save).toHaveBeenCalledWith(storyToUpdate);
  });

  it('updateUserStory => updates a user story description and returns the associated project id', async () => {
    const field = 'description';
    const value = 'us 11 description - Edited';
    const userStoryId = 11;

    const storyToUpdate = {
      id: 11,
      name: 'User Story 11',
      description: 'us 11 description',
      feature: {
        id: 4,
        project: {
          id: 2,
        },
      },
    } as UserStory;

    const updatedStory = {
      id: 11,
      name: 'User Story 11',
      description: 'us 11 description - Edited',
      feature: {
        id: 4,
        project: {
          id: 2,
        },
      },
    } as UserStory;

    jest
      .spyOn(mockUserStoriesRepository, 'findOne')
      .mockReturnValue(storyToUpdate);
    jest.spyOn(mockUserStoriesRepository, 'save').mockReturnValue(updatedStory);

    const result = await service.updateUserStory(field, value, userStoryId);

    expect(result).toEqual({ message: 'User story updated' });
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: userStoryId,
      },
      relations: ['feature', 'feature.project'],
    });
    expect(mockUserStoriesRepository.save).toHaveBeenCalled();
    expect(mockUserStoriesRepository.save).toHaveBeenCalledWith(storyToUpdate);
  });

  it('updateUserStory => throws an error when a user story is not found', async () => {
    const field = 'description';
    const value = 'us 11 description - Edited';
    const userStoryId = 11;

    jest.spyOn(mockUserStoriesRepository, 'findOne').mockReturnValue(undefined);

    expect(async () => {
      await service.updateUserStory(field, value, userStoryId);
    }).rejects.toThrow(NotFoundException);
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: userStoryId,
      },
      relations: ['feature', 'feature.project'],
    });
  });

  it('deleteUserStory => deletes the user story found by the passed in id', async () => {
    const userStoryId = 11;

    const userStoryToDelete = {} as UserStory;

    mockUserStoriesRepository.findOne.mockReturnValue(userStoryToDelete);
    mockUserStoriesRepository.delete.mockReturnValue({});

    const result = await service.deleteUserStory(userStoryId);

    expect(result).toEqual({ message: 'User story deleted' });
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: userStoryId,
      },
    });
    expect(mockUserStoriesRepository.delete).toHaveBeenCalled();
    expect(mockUserStoriesRepository.delete).toHaveBeenCalledWith(
      userStoryToDelete,
    );
  });

  it('deleteUserStory => throws an error when a user story is not found', async () => {
    const userStoryId = 11;

    mockUserStoriesRepository.findOne.mockReturnValue(undefined);

    expect(async () => {
      await service.deleteUserStory(userStoryId);
    }).rejects.toThrow(BadRequestException);
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalled();
    expect(mockUserStoriesRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: userStoryId,
      },
    });
  });
});
