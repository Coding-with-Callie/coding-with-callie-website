import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PagesService } from '../pages/pages.service';
import { SectionsService } from '../sections/sections.service';

describe('AdminService', () => {
  let service: AdminService;

  const mockPagesService = {};

  const mockSectionsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: PagesService, useValue: mockPagesService },
        { provide: SectionsService, useValue: mockSectionsService },
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
