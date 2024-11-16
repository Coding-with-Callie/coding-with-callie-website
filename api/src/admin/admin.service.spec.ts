import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { ResourceService } from '../resource/resource.service';
import { SpeakersService } from '../speakers/speakers.service';

describe('AdminService', () => {
  let service: AdminService;

  const mockResourceService = {
    createResource: jest.fn(),
    deleteResource: jest.fn(),
    updateResource: jest.fn(),
    updateOrder: jest.fn(),
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
});
