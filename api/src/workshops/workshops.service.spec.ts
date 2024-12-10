import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsService } from './workshops.service';
import { Workshop } from './entities/workshop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('WorkshopsService', () => {
  let service: WorkshopsService;

  const mockWorkshopsRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkshopsService,
        {
          provide: getRepositoryToken(Workshop),
          useValue: mockWorkshopsRepository,
        },
      ],
    }).compile();

    service = module.get<WorkshopsService>(WorkshopsService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return workshops', async () => {
    const workshops = [{ id: 1, name: 'Workshop 1' }];
    mockWorkshopsRepository.find.mockReturnValue(workshops);

    expect(await service.getWorkshops()).toEqual(workshops);
    expect(mockWorkshopsRepository.find).toHaveBeenCalledTimes(1);
  });
});
