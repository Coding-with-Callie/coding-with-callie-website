import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { BadRequestException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  const mockTaskRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getUserStoryTasks => should find tasks corresponding to a user story id', async () => {
    const id = 1;
    const tasks = [
      {
        id: 1,
        name: 'Task 1',
        status: 'To Do',
      },
      {
        id: 2,
        name: 'Task 2',
        status: 'To Do',
      },
    ] as Task[];

    jest.spyOn(mockTaskRepository, 'find').mockReturnValue(tasks);

    const result = await service.getUserStoryTasks(id);

    expect(result).toEqual(tasks);
    expect(mockTaskRepository.find).toHaveBeenCalled();
    expect(mockTaskRepository.find).toHaveBeenCalledWith({
      where: { userStory: { id } },
    });
  });

  it('createTask => create a task and return a success message', async () => {
    const name = 'Task 3';
    const userStoryId = 1;
    const savedTask = {} as Task;

    mockTaskRepository.save.mockReturnValue(savedTask);

    const result = await service.createTask(name, userStoryId);

    expect(result).toEqual({ message: 'Task created' });
    expect(mockTaskRepository.save).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith({
      name,
      userStory: {
        id: userStoryId,
      },
    });
  });

  it('updateTask => should update a task name and return a success message', async () => {
    const field = 'name';
    const value = 'Task 1 - Edited';
    const taskId = 1;

    const taskToUpdate = {
      name: 'Task 1',
      status: 'To Do',
    } as Task;

    const updatedTask = {
      name: 'Task 1 - Edited',
      status: 'To Do',
    } as Task;

    mockTaskRepository.findOne.mockReturnValue(taskToUpdate);

    const result = await service.updateTask(field, value, taskId);

    expect(result).toEqual({ message: 'Task updated' });
    expect(mockTaskRepository.findOne).toHaveBeenCalled();
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: { id: taskId },
      relations: ['userStory'],
    });
    expect(mockTaskRepository.save).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith(updatedTask);
  });

  it('updateTask => should update a task status and return a success message', async () => {
    const field = 'status';
    const value = 'In Progress';
    const taskId = 1;

    const taskToUpdate = {
      name: 'Task 1',
      status: 'To Do',
    } as Task;

    const updatedTask = {
      name: 'Task 1',
      status: 'In Progress',
    } as Task;

    mockTaskRepository.findOne.mockReturnValue(taskToUpdate);

    const result = await service.updateTask(field, value, taskId);

    expect(result).toEqual({ message: 'Task updated' });
    expect(mockTaskRepository.findOne).toHaveBeenCalled();
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: taskId,
      },
      relations: ['userStory'],
    });
    expect(mockTaskRepository.save).toHaveBeenCalled();
    expect(mockTaskRepository.save).toHaveBeenCalledWith(updatedTask);
  });

  it('updateTask => should throw error if task is not found', async () => {
    const field = 'name';
    const value = 'Task 1 - Edited';
    const taskId = 1;

    mockTaskRepository.findOne.mockReturnValue(undefined);

    expect(async () => {
      await service.updateTask(field, value, taskId);
    }).rejects.toThrow(BadRequestException);
    expect(mockTaskRepository.findOne).toHaveBeenCalled();
    expect(mockTaskRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: taskId,
      },
      relations: ['userStory'],
    });
    expect(mockTaskRepository.save).not.toHaveBeenCalled();
  });

  it('deleteTask => should find a task based on a task id, delete it, and return a success message', async () => {
    const taskId = 1;
    const taskToDelete = {} as Task;

    mockTaskRepository.findOneBy.mockReturnValue(taskToDelete);

    const result = await service.deleteTask(taskId);

    expect(result).toEqual({ message: 'Task deleted' });
    expect(mockTaskRepository.findOneBy).toHaveBeenCalled();
    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
    expect(mockTaskRepository.delete).toHaveBeenCalled();
    expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskToDelete);
  });

  it('deleteTask => should throw error if task is not found', async () => {
    const taskId = 10000;

    mockTaskRepository.findOneBy.mockReturnValue(undefined);

    expect(async () => {
      await service.deleteTask(taskId);
    }).rejects.toThrow(BadRequestException);
    expect(mockTaskRepository.findOneBy).toHaveBeenCalled();
    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: taskId });
    expect(mockTaskRepository.delete).not.toHaveBeenCalled();
  });
});
