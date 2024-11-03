import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { ResourceService } from './resource/resource.service';
import { WorkshopsService } from './workshops/workshops.service';
import { SpeakersService } from './speakers/speakers.service';
import { UsersService } from './users/users.service';
import { MailService } from './mail/mail.service';

describe('AppService', () => {
  let service: AppService;

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('token'),
    verifyAsync: jest.fn().mockResolvedValue({}),
  };

  const mockResourceService = {
    getResources: jest.fn().mockResolvedValue([]),
  };

  const mockWorkshopsService = {
    getWorkshops: jest.fn().mockResolvedValue([]),
  };

  const mockSpeakersService = {
    findAllSpeakers: jest.fn().mockResolvedValue([]),
  };

  const mockUsersService = {
    findOneByUsername: jest.fn().mockResolvedValue(null),
    findOneByEmail: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockResolvedValue({}),
  };

  const mockMailService = {
    sendNewUserEmail: jest.fn(),
    sendEmailToNewUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ResourceService, useValue: mockResourceService },
        { provide: WorkshopsService, useValue: mockWorkshopsService },
        { provide: SpeakersService, useValue: mockSpeakersService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getResources', async () => {
    const resources = await service.getAllResources();
    expect(mockResourceService.getResources).toHaveBeenCalled();
    expect(mockResourceService.getResources).toHaveBeenCalledTimes(1);
    expect(resources).toEqual([]);
  });

  it('should call getWorkshops', async () => {
    const workshops = await service.getAllWorkshops();
    expect(mockWorkshopsService.getWorkshops).toHaveBeenCalled();
    expect(mockWorkshopsService.getWorkshops).toHaveBeenCalledTimes(1);
    expect(workshops).toEqual([]);
  });
});
