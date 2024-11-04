import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { ResourceService } from './resource/resource.service';
import { WorkshopsService } from './workshops/workshops.service';
import { SpeakersService } from './speakers/speakers.service';
import { UsersService } from './users/users.service';
import { MailService } from './mail/mail.service';
import { hashPassword } from './helpers/helpers';

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
    getSpeakers: jest.fn().mockResolvedValue([]),
  };

  const mockUsersService = {
    checkIfUsernameExists: jest.fn(),
    checkIfEmailExists: jest.fn(),
    findOneByUsername: jest.fn(),
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
    jest.clearAllMocks(); // Clear mock calls from previous tests
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

  it('should call getSpeakers', async () => {
    const speakers = await service.getAllSpeakers();
    expect(mockSpeakersService.getSpeakers).toHaveBeenCalled();
    expect(mockSpeakersService.getSpeakers).toHaveBeenCalledTimes(1);
    expect(speakers).toEqual([]);
  });

  it('should call createUser and sucessfully create a user', async () => {
    const user = {
      name: 'name',
      email: 'email',
      username: 'username',
      password: 'password',
    };
    const photoUrl = 'photoUrl';
    const response = await service.signUp(user, photoUrl);
    mockUsersService.checkIfUsernameExists.mockResolvedValue(false);
    mockUsersService.checkIfEmailExists.mockResolvedValue(false);
    expect(mockUsersService.checkIfUsernameExists).toHaveBeenCalled();
    expect(mockUsersService.checkIfEmailExists).toHaveBeenCalled();
    expect(mockUsersService.createUser).toHaveBeenCalled();
    expect(mockMailService.sendNewUserEmail).toHaveBeenCalled();
    expect(mockMailService.sendEmailToNewUser).toHaveBeenCalled();
    expect(response).toEqual({ message: 'User created' });
  });

  it('should call createUser and return user already exists', async () => {
    const user = {
      name: 'name',
      email: 'email',
      username: 'username',
      password: 'password',
    };
    const photoUrl = 'photoUrl';
    // Mocking that the user already exists
    mockUsersService.checkIfUsernameExists.mockResolvedValue(true);
    const response = await service.signUp(user, photoUrl);
    expect(mockUsersService.checkIfUsernameExists).toHaveBeenCalled();
    expect(mockUsersService.checkIfEmailExists).not.toHaveBeenCalled();
    expect(mockUsersService.createUser).not.toHaveBeenCalled();
    expect(mockMailService.sendNewUserEmail).not.toHaveBeenCalled();
    expect(mockMailService.sendEmailToNewUser).not.toHaveBeenCalled();
    expect(response).toEqual('user already exists');
  });

  it('should call createUser and return email already exists', async () => {
    const user = {
      name: 'name',
      email: 'email',
      username: 'username',
      password: 'password',
    };
    const photoUrl = 'photoUrl';
    // Mocking that the username does not exist
    mockUsersService.checkIfUsernameExists.mockResolvedValue(false);
    // Mocking that the email already exists
    mockUsersService.checkIfEmailExists.mockResolvedValue(true);
    const response = await service.signUp(user, photoUrl);
    expect(mockUsersService.checkIfUsernameExists).toHaveBeenCalled();
    expect(mockUsersService.checkIfEmailExists).toHaveBeenCalled();
    expect(mockUsersService.createUser).not.toHaveBeenCalled();
    expect(mockMailService.sendNewUserEmail).not.toHaveBeenCalled();
    expect(mockMailService.sendEmailToNewUser).not.toHaveBeenCalled();
    expect(response).toEqual('email already exists');
  });

  it('should call createAccessToken', async () => {
    const user = {
      id: 1,
      username: 'username',
      role: 'role',
      password: 'password',
      email: 'email',
      name: 'name',
      photo: 'photo',
      review: [],
      projects: [],
    };
    const response = await service.createAccessToken(user);
    expect(mockJwtService.signAsync).toHaveBeenCalled();
    expect(response).toEqual({ access_token: 'token' });
  });

  it('should call logIn and return token', async () => {
    const username = 'username';
    const password = 'password';

    const hashedPassword = await hashPassword(password);

    const user = {
      id: 1,
      username: 'username',
      role: 'role',
      password: hashedPassword,
      email: 'email',
      name: 'name',
      photo: 'photo',
      review: [],
      projects: [],
    };
    mockUsersService.findOneByUsername.mockResolvedValue(user);
    const response = await service.logIn(username, password);
    expect(mockUsersService.findOneByUsername).toHaveBeenCalled();
    expect(mockUsersService.findOneByUsername).toHaveBeenCalledTimes(1);
    expect(mockJwtService.signAsync).toHaveBeenCalled();
    expect(response).toEqual({ access_token: 'token' });
  });

  it('should call logIn and throw an error when user does not exist', async () => {
    const username = 'username';
    const password = 'password';
    mockUsersService.findOneByUsername.mockResolvedValue(null);
    try {
      await service.logIn(username, password);
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(error.message).toEqual('Unauthorized');
    }
  });

  it('should call logIn and throw an error when password is incorrect', async () => {
    const username = 'username';
    const password = 'password';

    const hashedPassword = await hashPassword(password);

    const user = {
      id: 1,
      username: 'username',
      role: 'role',
      password: hashedPassword,
      email: 'email',
      name: 'name',
      photo: 'photo',
      review: [],
      projects: [],
    };
    mockUsersService.findOneByUsername.mockResolvedValue(user);
    try {
      await service.logIn(username, 'wrongpassword');
    } catch (error) {
      expect(error.status).toEqual(401);
      expect(error.message).toEqual('Unauthorized');
    }
  });
});
