import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { ResourceService } from '../resource/resource.service';
import { SpeakersService } from '../speakers/speakers.service';
import { ResourceDTO } from './admin.controller';
import { Resource } from '../resource/entities/resource.entity';

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

  it('should call deleteResource and getResources from resource service', async () => {
    const id = 1;
    const resources = [{}] as Resource[];

    mockResourceService.getResources.mockResolvedValue(resources);

    const result = await service.deleteResourceAndReturnUpdatedResources(id);
    expect(result).toEqual(resources);
    expect(mockResourceService.deleteResource).toHaveBeenCalled();
    expect(mockResourceService.deleteResource).toHaveBeenCalledWith(id);
    expect(mockResourceService.getResources).toHaveBeenCalled();
  });

  it('should call updateResource and getResources from resource service', async () => {
    const id = 1;
    const resource = {} as ResourceDTO;
    const file = {} as Express.Multer.File;
    const resources = [{}] as Resource[];

    mockResourceService.getResources.mockResolvedValue(resources);

    const result = await service.updateResourceAndReturnUpdatedResources(
      id,
      resource,
      file,
    );
    expect(result).toEqual(resources);
    expect(mockResourceService.updateResource).toHaveBeenCalled();
    expect(mockResourceService.updateResource).toHaveBeenCalledWith(
      id,
      resource,
      file,
    );
    expect(mockResourceService.getResources).toHaveBeenCalled();
  });

  it('should call updateOrder and getResources from resource service', async () => {
    const id = 1;
    const direction = 'up';
    const resources = [{}] as Resource[];

    mockResourceService.getResources.mockResolvedValue(resources);

    const result = await service.updateResourceOrderAndReturnUpdatedResources(
      id,
      direction,
    );
    expect(result).toEqual(resources);
    expect(mockResourceService.updateOrder).toHaveBeenCalled();
    expect(mockResourceService.updateOrder).toHaveBeenCalledWith(id, direction);
    expect(mockResourceService.getResources).toHaveBeenCalled();
  });
});
