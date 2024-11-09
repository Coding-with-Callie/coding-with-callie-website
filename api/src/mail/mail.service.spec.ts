import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { HTML_TEMPLATE as newUserTemplate } from './new-user-mail-template';
import { HTML_TEMPLATE as newMessageTemplate } from './new-message-mail-template';
import path from 'path';

describe('MailService', () => {
  let service: MailService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    jest.clearAllMocks(); // Clear mock calls from previous tests
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send new user email when nodemailer is configured properly', async () => {
    const newUser = {
      name: 'Callie',
      email: 'calliestoscup@gmail.com',
      username: 'callie',
      password: 'password',
    };

    mockMailerService.sendMail.mockResolvedValue({});
    const result = await service.sendNewUserEmail(newUser);
    expect(result).toEqual('message sent');
    expect(mockMailerService.sendMail).toHaveBeenCalled();
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      from: 'calliestoscup@gmail.com>',
      to: 'calliestoscup@gmail.com',
      subject: 'Coding with Callie has a new user 🥳',
      text: '',
      attachments: [
        {
          filename: 'slothblue.png',
          path: path.join(__dirname, '/slothblue.png'),
          cid: 'logo',
        },
      ],
      html: newUserTemplate(newUser),
    });
  });

  it('should send new user email when nodemailer is not configured properly', async () => {
    const newUser = {
      name: 'Callie',
      email: 'calliestoscup@gmail.com',
      username: 'callie',
      password: 'password',
    };
    // Save the original console.error implementation
    const originalConsoleError = console.error;
    console.error = jest.fn();

    mockMailerService.sendMail.mockRejectedValue(new Error('error'));
    await service.sendNewUserEmail(newUser);
    expect(console.error).toHaveBeenCalled();

    // Reset console.error to its original implementation
    console.error = originalConsoleError;
  });

  it('should send new message email when nodemailer is configured properly', async () => {
    const message = {
      name: 'Callie',
      email: 'calliestoscup@gmail.com',
      message: 'Hello!',
    };

    mockMailerService.sendMail.mockResolvedValue({});
    const result = await service.sendNewMessageEmail(message);
    expect(result).toEqual('message sent');
    expect(mockMailerService.sendMail).toHaveBeenCalled();
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      from: 'calliestoscup@gmail.com>', // sender address
      to: 'calliestoscup@gmail.com', // receiver email
      subject: 'Coding with Callie has a new message 🥳', // Subject line
      text: '',
      attachments: [
        {
          filename: 'slothblue.png',
          path: path.join(__dirname, '/slothblue.png'),
          cid: 'logo',
        },
      ],
      html: newMessageTemplate(message),
    });
  });

  it('should send new message email when nodemailer is not configured properly', async () => {
    const message = {
      name: 'Callie',
      email: 'calliestoscup@gmail.com',
      message: 'Hello!',
    };

    // Save the original console.error implementation
    const originalConsoleError = console.error;
    console.error = jest.fn();

    mockMailerService.sendMail.mockRejectedValue(new Error('error'));
    await service.sendNewMessageEmail(message);
    expect(console.error).toHaveBeenCalled();

    // Reset console.error to its original implementation
    console.error = originalConsoleError;
  });
});
