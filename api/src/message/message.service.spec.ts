import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { MailService } from '../mail/mail.service';
import { mock } from 'node:test';

describe('MessageService', () => {
  let service: MessageService;

  const mockMessageRepository = {
    save: jest.fn(),
  };

  const mockMailService = {
    sendNewMessageEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save a message and send an email', () => {
    const message = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      message: 'Hello, World!',
    };

    mockMessageRepository.save.mockResolvedValue(message);
    const result = service.submitMessage(message);
    expect(result).resolves.toEqual(message);
    expect(mockMessageRepository.save).toHaveBeenCalledWith(message);
    expect(mockMailService.sendNewMessageEmail).toHaveBeenCalledWith(message);
  });
});
