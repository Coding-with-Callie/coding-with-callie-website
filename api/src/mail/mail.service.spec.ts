import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { HTML_TEMPLATE as newUserTemplate } from './new-user-mail-template';
import { HTML_TEMPLATE as newMessageTemplate } from './new-message-mail-template';
import { HTML_TEMPLATE as messageToNewUserTemplate } from './message-to-new-user';
import { HTML_TEMPLATE as resetPasswordTemplate } from './reset-password-template';
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

    // Suppress console.error output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockMailerService.sendMail.mockRejectedValue(new Error('error'));
    await service.sendNewUserEmail(newUser);
    expect(console.error).toHaveBeenCalledWith(
      'There was an error emailing a new user:',
      'error',
    );
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

    // Suppress console.error output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockMailerService.sendMail.mockRejectedValue(new Error('error'));
    await service.sendNewMessageEmail(message);
    expect(console.error).toHaveBeenCalledWith(
      'There was an error emailing a message:',
      'error',
    );
  });

  it('should send email to new user when nodemailer is configured properly', async () => {
    const newUser = {
      name: 'Callie',
      email: 'calliestoscup@gmail.com',
      username: 'callie',
      password: 'password',
    };

    mockMailerService.sendMail.mockResolvedValue({});
    const result = await service.sendEmailToNewUser(newUser);
    expect(result).toEqual('message sent');
    expect(mockMailerService.sendMail).toHaveBeenCalled();
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      from: 'calliestoscup@gmail.com>', // sender address
      to:
        process.env.ENVIRONMENT === 'local'
          ? 'calliestoscup@gmail.com'
          : newUser.email, // receiver email
      subject: 'Welcome to the Coding with Callie community 👋🏻', // Subject line
      text: '',
      attachments: [
        {
          filename: 'slothblue.png',
          path: path.join(__dirname, '/slothblue.png'),
          cid: 'logo',
        },
      ],
      html: messageToNewUserTemplate(newUser),
    });
  });

  it('should send email to new user when nodemailer is not configured properly', async () => {
    const newUser = {
      name: 'Callie',
      email: 'calliestoscup@gmail.com',
      username: 'callie',
      password: 'password',
    };

    // Suppress console.error output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockMailerService.sendMail.mockRejectedValue(new Error('error'));
    await service.sendEmailToNewUser(newUser);
    expect(console.error).toHaveBeenCalledWith(
      'There was an error emailing a new user:',
      'error',
    );
  });

  it('should send password reset email when nodemailer is configured properly', async () => {
    const email = 'calliestoscup@gmail.com';
    const access_token = 'access_token';
    const id = 1;

    mockMailerService.sendMail.mockResolvedValue({});
    const result = await service.sendPasswordResetEmail(
      email,
      access_token,
      id,
    );
    expect(result).toEqual('message sent');
    expect(mockMailerService.sendMail).toHaveBeenCalled();
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      from: 'calliestoscup@gmail.com>', // sender address
      to:
        process.env.ENVIRONMENT === 'local' ? 'calliestoscup@gmail.com' : email, // receiver email
      subject: 'Reset Your Password', // Subject line
      text: '',
      attachments: [
        {
          filename: 'slothblue.png',
          path: path.join(__dirname, '/slothblue.png'),
          cid: 'logo',
        },
        {
          filename: 'image-1.png',
          path: path.join(__dirname, '/image-1.png'),
          cid: 'icon',
        },
      ],
      html: resetPasswordTemplate(access_token, id),
    });
  });

  it('should send password reset email when nodemailer is not configured properly', async () => {
    const email = 'calliestoscup@gmail.com';
    const access_token = 'access token';
    const id = 1;

    // Suppress console.error output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    mockMailerService.sendMail.mockRejectedValue(new Error('error'));
    await service.sendPasswordResetEmail(email, access_token, id);
    expect(console.error).toHaveBeenCalledWith(
      'There was an error sending a password reset email:',
      'error',
    );
  });
});
