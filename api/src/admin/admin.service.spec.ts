import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { ResourceService } from '../resource/resource.service';
import { SpeakersService } from '../speakers/speakers.service';
import { ResourceDTO } from './admin.controller';
import e from 'express';

describe('AdminService', () => {
  let service: AdminService;

  const mockResourceService = {
    createResource: jest.fn(),
    deleteResource: jest.fn(),
    updateResource: jest.fn(),
    updateOrder: jest.fn(),
    getResources: jest.fn(),
  };

  const mockSpeakersService = {
    createSpeaker: jest.fn(),
    deleteSpeaker: jest.fn(),
    updateSpeaker: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: ResourceService,
          useValue: mockResourceService,
        },
        {
          provide: SpeakersService,
          useValue: mockSpeakersService,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createResource and getResources from resource service', async () => {
    const resource = {} as ResourceDTO;
    const file = {} as Express.Multer.File;
    const resourceResponse = { ...resource, id: 1 };

    mockResourceService.createResource.mockResolvedValue(resourceResponse);
    mockResourceService.getResources.mockResolvedValue([resourceResponse]);

    const result = await service.createResourceAndReturnUpdatedResources(
      resource,
      file,
    );
    expect(result).toEqual([resourceResponse]);
    expect(mockResourceService.createResource).toHaveBeenCalled();
    expect(mockResourceService.createResource).toHaveBeenCalledWith(
      resource,
      file,
    );
    expect(mockResourceService.getResources).toHaveBeenCalled();
  });
});
