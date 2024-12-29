import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { ResourceService } from '../resource/resource.service';
import { SpeakersService } from '../speakers/speakers.service';
import { ResourceDTO, SpeakerDTO } from './admin.controller';
import { Resource } from '../resource/entities/resource.entity';
import { Speaker } from '../speakers/entities/speaker.entity';

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
    getSpeakers: jest.fn(),
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

  it('should call createSpeaker and getSpeakers from speakers service', async () => {
    const speaker = {} as SpeakerDTO;
    const file = {} as Express.Multer.File;
    const speakers = [{}] as Speaker[];

    mockSpeakersService.createSpeaker.mockResolvedValue(speaker);
    mockSpeakersService.getSpeakers.mockResolvedValue(speakers);

    const result = await service.createSpeakerAndReturnUpdatedSpeakers(
      speaker,
      file,
    );
    expect(result).toEqual(speakers);
    expect(mockSpeakersService.createSpeaker).toHaveBeenCalled();
    expect(mockSpeakersService.createSpeaker).toHaveBeenCalledWith(
      speaker,
      file,
    );
    expect(mockSpeakersService.getSpeakers).toHaveBeenCalled();
  });

  it('should call deleteSpeaker and getSpeakers from speakers service', async () => {
    const id = 1;
    const speakers = [{}] as Speaker[];

    mockSpeakersService.getSpeakers.mockResolvedValue(speakers);

    const result = await service.deleteSpeakerAndReturnUpdatedSpeakers(id);
    expect(result).toEqual(speakers);
    expect(mockSpeakersService.deleteSpeaker).toHaveBeenCalled();
    expect(mockSpeakersService.deleteSpeaker).toHaveBeenCalledWith(id);
    expect(mockSpeakersService.getSpeakers).toHaveBeenCalled();
  });

  it('should call updateSpeaker and getSpeakers from speakers service', async () => {
    const id = 1;
    const speaker = {} as SpeakerDTO;
    const file = {} as Express.Multer.File;
    const speakers = [{}] as Speaker[];

    mockSpeakersService.getSpeakers.mockResolvedValue(speakers);

    const result = await service.updateSpeakerAndReturnUpdatedSpeakers(
      id,
      speaker,
      file,
    );
    expect(result).toEqual(speakers);
    expect(mockSpeakersService.updateSpeaker).toHaveBeenCalled();
    expect(mockSpeakersService.updateSpeaker).toHaveBeenCalledWith(
      id,
      speaker,
      file,
    );
    expect(mockSpeakersService.getSpeakers).toHaveBeenCalled();
  });
});
