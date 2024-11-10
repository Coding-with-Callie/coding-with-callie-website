import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { Feature } from '../features/entities/feature.entity';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const mockProjectsRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addStatusesToProject => should add statuses to projects, features, and user stories', () => {
    const project = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description',
      features: [
        {
          id: 1,
          name: 'Feature 1',
          description: 'f1 description',
          userStories: [
            {
              id: 1,
              name: 'User Story 1',
              description: 'us1 description',
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
              ],
            },
            {
              id: 2,
              name: 'User Story 2',
              description: 'us2 description',
              tasks: [
                {
                  id: 3,
                  name: 'Task 3',
                  status: 'In Progress',
                },
                {
                  id: 4,
                  name: 'Task 4',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Feature 2',
          description: 'f2 description',
          userStories: [
            {
              id: 3,
              name: 'User Story 3',
              description: 'us3 description',
              tasks: [
                {
                  id: 5,
                  name: 'Task 5',
                  status: 'To Do',
                },
                {
                  id: 6,
                  name: 'Task 6',
                  status: 'In Progress',
                },
              ],
            },
            {
              id: 4,
              name: 'User Story 4',
              description: 'us4 description',
              tasks: [
                {
                  id: 7,
                  name: 'Task 7',
                  status: 'Done!',
                },
                {
                  id: 8,
                  name: 'Task 8',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
      ],
    } as Project;

    const projectWithStatuses = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description',
      status: 'In Progress',
      features: [
        {
          id: 1,
          name: 'Feature 1',
          description: 'f1 description',
          userStoryCount: 2,
          completedUserStories: 0,
          status: 'In Progress',
          userStories: [
            {
              id: 1,
              name: 'User Story 1',
              description: 'us1 description',
              taskCount: 2,
              completedTasks: 0,
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
              ],
            },
            {
              id: 2,
              name: 'User Story 2',
              description: 'us2 description',
              taskCount: 2,
              completedTasks: 1,
              tasks: [
                {
                  id: 3,
                  name: 'Task 3',
                  status: 'In Progress',
                },
                {
                  id: 4,
                  name: 'Task 4',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Feature 2',
          description: 'f2 description',
          userStoryCount: 2,
          completedUserStories: 1,
          status: 'In Progress',
          userStories: [
            {
              id: 3,
              name: 'User Story 3',
              description: 'us3 description',
              taskCount: 2,
              completedTasks: 0,
              tasks: [
                {
                  id: 5,
                  name: 'Task 5',
                  status: 'To Do',
                },
                {
                  id: 6,
                  name: 'Task 6',
                  status: 'In Progress',
                },
              ],
            },
            {
              id: 4,
              name: 'User Story 4',
              description: 'us4 description',
              taskCount: 2,
              completedTasks: 2,
              tasks: [
                {
                  id: 7,
                  name: 'Task 7',
                  status: 'Done!',
                },
                {
                  id: 8,
                  name: 'Task 8',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
      ],
    };

    const result = service.addStatusesToProject(project);

    expect(result).toEqual(projectWithStatuses);
  });

  it('getUserProjects => returns a users projects based on their passed in id', async () => {
    const id = 15;

    const projects = [
      {
        id: 1,
        name: 'Project 1',
        description: 'p1 description',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
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
                ],
              },
              {
                id: 2,
                name: 'User Story 2',
                description: 'us2 description',
                tasks: [
                  {
                    id: 3,
                    name: 'Task 3',
                    status: 'In Progress',
                  },
                  {
                    id: 4,
                    name: 'Task 4',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: 'Feature 2',
            description: 'f2 description',
            userStories: [
              {
                id: 3,
                name: 'User Story 3',
                description: 'us3 description',
                tasks: [
                  {
                    id: 5,
                    name: 'Task 5',
                    status: 'To Do',
                  },
                  {
                    id: 6,
                    name: 'Task 6',
                    status: 'In Progress',
                  },
                ],
              },
              {
                id: 4,
                name: 'User Story 4',
                description: 'us4 description',
                tasks: [
                  {
                    id: 7,
                    name: 'Task 7',
                    status: 'Done!',
                  },
                  {
                    id: 8,
                    name: 'Task 8',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'p2 description',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
                tasks: [
                  {
                    id: 1,
                    name: 'Task 1',
                    status: 'To Do',
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as Project[];

    const projectsWithStatuses = [
      {
        id: 1,
        name: 'Project 1',
        description: 'p1 description',
        status: 'In Progress',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStoryCount: 2,
            completedUserStories: 0,
            status: 'In Progress',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
                taskCount: 2,
                completedTasks: 0,
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
                ],
              },
              {
                id: 2,
                name: 'User Story 2',
                description: 'us2 description',
                taskCount: 2,
                completedTasks: 1,
                tasks: [
                  {
                    id: 3,
                    name: 'Task 3',
                    status: 'In Progress',
                  },
                  {
                    id: 4,
                    name: 'Task 4',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: 'Feature 2',
            description: 'f2 description',
            userStoryCount: 2,
            completedUserStories: 1,
            status: 'In Progress',
            userStories: [
              {
                id: 3,
                name: 'User Story 3',
                description: 'us3 description',
                taskCount: 2,
                completedTasks: 0,
                tasks: [
                  {
                    id: 5,
                    name: 'Task 5',
                    status: 'To Do',
                  },
                  {
                    id: 6,
                    name: 'Task 6',
                    status: 'In Progress',
                  },
                ],
              },
              {
                id: 4,
                name: 'User Story 4',
                description: 'us4 description',
                taskCount: 2,
                completedTasks: 2,
                tasks: [
                  {
                    id: 7,
                    name: 'Task 7',
                    status: 'Done!',
                  },
                  {
                    id: 8,
                    name: 'Task 8',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'p2 description',
        status: 'To Do',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStoryCount: 1,
            completedUserStories: 0,
            status: 'To Do',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
                taskCount: 1,
                completedTasks: 0,
                tasks: [
                  {
                    id: 1,
                    name: 'Task 1',
                    status: 'To Do',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    jest.spyOn(mockProjectsRepository, 'find').mockReturnValue(projects);

    const result = await service.getUserProjects(id);

    expect(result).toEqual(projectsWithStatuses);
    expect(mockProjectsRepository.find).toHaveBeenCalled();
    expect(mockProjectsRepository.find).toHaveBeenCalledWith({
      where: { user: { id } },
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });
  });

  it('getProjectById => returns a project with statuses from input project id', async () => {
    const id = 1;

    const project = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description',
      features: [
        {
          id: 1,
          name: 'Feature 1',
          description: 'f1 description',
          userStories: [
            {
              id: 1,
              name: 'User Story 1',
              description: 'us1 description',
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
              ],
            },
            {
              id: 2,
              name: 'User Story 2',
              description: 'us2 description',
              tasks: [
                {
                  id: 3,
                  name: 'Task 3',
                  status: 'In Progress',
                },
                {
                  id: 4,
                  name: 'Task 4',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Feature 2',
          description: 'f2 description',
          userStories: [
            {
              id: 3,
              name: 'User Story 3',
              description: 'us3 description',
              tasks: [
                {
                  id: 5,
                  name: 'Task 5',
                  status: 'To Do',
                },
                {
                  id: 6,
                  name: 'Task 6',
                  status: 'In Progress',
                },
              ],
            },
            {
              id: 4,
              name: 'User Story 4',
              description: 'us4 description',
              tasks: [
                {
                  id: 7,
                  name: 'Task 7',
                  status: 'Done!',
                },
                {
                  id: 8,
                  name: 'Task 8',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
      ],
    } as Project;

    const projectWithStatuses = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description',
      status: 'In Progress',
      features: [
        {
          id: 1,
          name: 'Feature 1',
          description: 'f1 description',
          userStoryCount: 2,
          completedUserStories: 0,
          status: 'In Progress',
          userStories: [
            {
              id: 1,
              name: 'User Story 1',
              description: 'us1 description',
              taskCount: 2,
              completedTasks: 0,
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
              ],
            },
            {
              id: 2,
              name: 'User Story 2',
              description: 'us2 description',
              taskCount: 2,
              completedTasks: 1,
              tasks: [
                {
                  id: 3,
                  name: 'Task 3',
                  status: 'In Progress',
                },
                {
                  id: 4,
                  name: 'Task 4',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Feature 2',
          description: 'f2 description',
          userStoryCount: 2,
          completedUserStories: 1,
          status: 'In Progress',
          userStories: [
            {
              id: 3,
              name: 'User Story 3',
              description: 'us3 description',
              taskCount: 2,
              completedTasks: 0,
              tasks: [
                {
                  id: 5,
                  name: 'Task 5',
                  status: 'To Do',
                },
                {
                  id: 6,
                  name: 'Task 6',
                  status: 'In Progress',
                },
              ],
            },
            {
              id: 4,
              name: 'User Story 4',
              description: 'us4 description',
              taskCount: 2,
              completedTasks: 2,
              tasks: [
                {
                  id: 7,
                  name: 'Task 7',
                  status: 'Done!',
                },
                {
                  id: 8,
                  name: 'Task 8',
                  status: 'Done!',
                },
              ],
            },
          ],
        },
      ],
    };

    jest.spyOn(mockProjectsRepository, 'findOne').mockReturnValue(project);

    const result = await service.getProjectById(id);

    expect(result).toEqual(projectWithStatuses);
    expect(mockProjectsRepository.findOne).toHaveBeenCalled();
    expect(mockProjectsRepository.findOne).toHaveBeenCalledWith({
      where: { id },
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });
  });

  it('createProject => add new project and return all of user projects based on userId', async () => {
    const name = 'Project 2';
    const description = 'p2 description';
    const userId = 15;

    const savedProject = {
      id: 2,
      name: 'Project 2',
      description: 'p2 description',
      features: [
        {
          id: 1,
          name: 'Feature 1',
          description: 'f1 description',
          userStories: [
            {
              id: 1,
              name: 'User Story 1',
              description: 'us1 description',
              tasks: [
                {
                  id: 1,
                  name: 'Task 1',
                  status: 'To Do',
                },
              ],
            },
          ],
        },
      ],
    };

    const savedProjects = [
      {
        id: 1,
        name: 'Project 1',
        description: 'p1 description',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
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
                ],
              },
              {
                id: 2,
                name: 'User Story 2',
                description: 'us2 description',
                tasks: [
                  {
                    id: 3,
                    name: 'Task 3',
                    status: 'In Progress',
                  },
                  {
                    id: 4,
                    name: 'Task 4',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: 'Feature 2',
            description: 'f2 description',
            userStories: [
              {
                id: 3,
                name: 'User Story 3',
                description: 'us3 description',
                tasks: [
                  {
                    id: 5,
                    name: 'Task 5',
                    status: 'To Do',
                  },
                  {
                    id: 6,
                    name: 'Task 6',
                    status: 'In Progress',
                  },
                ],
              },
              {
                id: 4,
                name: 'User Story 4',
                description: 'us4 description',
                tasks: [
                  {
                    id: 7,
                    name: 'Task 7',
                    status: 'Done!',
                  },
                  {
                    id: 8,
                    name: 'Task 8',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'p2 description',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
                tasks: [
                  {
                    id: 1,
                    name: 'Task 1',
                    status: 'To Do',
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as Project[];

    const projectsWithStatuses = [
      {
        id: 1,
        name: 'Project 1',
        description: 'p1 description',
        status: 'In Progress',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStoryCount: 2,
            completedUserStories: 0,
            status: 'In Progress',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
                taskCount: 2,
                completedTasks: 0,
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
                ],
              },
              {
                id: 2,
                name: 'User Story 2',
                description: 'us2 description',
                taskCount: 2,
                completedTasks: 1,
                tasks: [
                  {
                    id: 3,
                    name: 'Task 3',
                    status: 'In Progress',
                  },
                  {
                    id: 4,
                    name: 'Task 4',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: 'Feature 2',
            description: 'f2 description',
            userStoryCount: 2,
            completedUserStories: 1,
            status: 'In Progress',
            userStories: [
              {
                id: 3,
                name: 'User Story 3',
                description: 'us3 description',
                taskCount: 2,
                completedTasks: 0,
                tasks: [
                  {
                    id: 5,
                    name: 'Task 5',
                    status: 'To Do',
                  },
                  {
                    id: 6,
                    name: 'Task 6',
                    status: 'In Progress',
                  },
                ],
              },
              {
                id: 4,
                name: 'User Story 4',
                description: 'us4 description',
                taskCount: 2,
                completedTasks: 2,
                tasks: [
                  {
                    id: 7,
                    name: 'Task 7',
                    status: 'Done!',
                  },
                  {
                    id: 8,
                    name: 'Task 8',
                    status: 'Done!',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'p2 description',
        status: 'To Do',
        features: [
          {
            id: 1,
            name: 'Feature 1',
            description: 'f1 description',
            userStoryCount: 1,
            completedUserStories: 0,
            status: 'To Do',
            userStories: [
              {
                id: 1,
                name: 'User Story 1',
                description: 'us1 description',
                taskCount: 1,
                completedTasks: 0,
                tasks: [
                  {
                    id: 1,
                    name: 'Task 1',
                    status: 'To Do',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    jest.spyOn(mockProjectsRepository, 'save').mockReturnValue(savedProject);
    jest.spyOn(mockProjectsRepository, 'find').mockReturnValue(savedProjects);

    const result = await service.createProject(name, description, userId);

    expect(result).toEqual(projectsWithStatuses);
    expect(mockProjectsRepository.save).toHaveBeenCalled();
    expect(mockProjectsRepository.save).toHaveBeenCalledWith({
      name,
      description,
      user: {
        id: userId,
      },
    });
    expect(mockProjectsRepository.find).toHaveBeenCalled();
    expect(mockProjectsRepository.find).toHaveBeenCalledWith({
      where: { user: { id: userId } },
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });
  });

  it('updateProject => updates a project name and returns the project with statuses', async () => {
    const field = 'name';
    const value = 'Project 1 - Edited';
    const projectId = 1;

    const projectToUpdate = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description',
    } as Project;

    const updatedProject = {
      id: 1,
      name: 'Project 1 - Edited',
      description: 'p1 description',
    } as Project;

    const projectWithRelations = {
      id: 1,
      name: 'Project 1 - Edited',
      description: 'p1 description',
      features: [] as Feature[],
    } as Project;

    const projectWithRelationsAndStatuses = {
      id: 1,
      name: 'Project 1 - Edited',
      description: 'p1 description',
      status: 'To Do',
      features: [] as Feature[],
    };

    mockProjectsRepository.findOneBy.mockReturnValue(projectToUpdate);
    // It doesn't matter what the return value is as we do not use it
    mockProjectsRepository.save.mockReturnValue({});
    mockProjectsRepository.findOne.mockReturnValueOnce(projectWithRelations);

    const result = await service.updateProject(field, value, projectId);

    expect(result).toEqual(projectWithRelationsAndStatuses);
    expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
    expect(mockProjectsRepository.findOneBy).toHaveBeenCalledWith({
      id: projectId,
    });
    expect(mockProjectsRepository.findOne).toHaveBeenLastCalledWith({
      where: { id: projectId },
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });
    expect(mockProjectsRepository.save).toHaveBeenCalled();
    expect(mockProjectsRepository.save).toHaveBeenCalledWith(updatedProject);
  });

  it('updateProject => updates a project description and returns the project with statuses', async () => {
    const field = 'description';
    const value = 'p1 description - Edited';
    const projectId = 1;

    const projectToUpdate = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description',
    } as Project;

    const updatedProject = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description - Edited',
    } as Project;

    const projectWithRelations = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description - Edited',
      features: [] as Feature[],
    } as Project;

    const projectWithRelationsAndStatuses = {
      id: 1,
      name: 'Project 1',
      description: 'p1 description - Edited',
      status: 'To Do',
      features: [] as Feature[],
    };

    mockProjectsRepository.findOneBy.mockReturnValue(projectToUpdate);
    // It doesn't matter what the return value is as we do not use it
    mockProjectsRepository.save.mockReturnValue({});
    mockProjectsRepository.findOne.mockReturnValueOnce(projectWithRelations);

    const result = await service.updateProject(field, value, projectId);

    expect(result).toEqual(projectWithRelationsAndStatuses);
    expect(mockProjectsRepository.findOneBy).toHaveBeenCalled();
    expect(mockProjectsRepository.findOneBy).toHaveBeenCalledWith({
      id: projectId,
    });
    expect(mockProjectsRepository.findOne).toHaveBeenCalled();
    expect(mockProjectsRepository.findOne).toHaveBeenCalledWith({
      where: { id: projectId },
      order: {
        features: {
          id: 'ASC',
          userStories: {
            id: 'ASC',
            tasks: {
              id: 'ASC',
            },
          },
        },
      },
      relations: [
        'features',
        'features.userStories',
        'features.userStories.tasks',
      ],
    });
    expect(mockProjectsRepository.save).toHaveBeenCalled();
    expect(mockProjectsRepository.save).toHaveBeenCalledWith(updatedProject);
  });

  it('deleteProject => should delete a project and return the delete project information', async () => {
    const projectId = 1;

    mockProjectsRepository.delete.mockReturnValue({ affected: 1 });

    const result = await service.deleteProject(projectId);

    expect(result).toEqual({ affected: 1 });
    expect(mockProjectsRepository.delete).toHaveBeenCalled();
    expect(mockProjectsRepository.delete).toHaveBeenCalledWith({
      id: projectId,
    });
  });
});
