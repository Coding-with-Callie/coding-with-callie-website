import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
