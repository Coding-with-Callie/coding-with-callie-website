import { Injectable } from '@nestjs/common';
import { HTML_TEMPLATE as newMessageTemplate } from './new-message-mail-template';
import { HTML_TEMPLATE as newUserTemplate } from './new-user-mail-template';
import { HTML_TEMPLATE as messageToNewUserTemplate } from './message-to-new-user';
import { HTML_TEMPLATE as resetPasswordTemplate } from './reset-password-template';
import { MailerService } from '@nestjs-modules/mailer';
import { NewUserDto } from '../app.controller';
import * as path from 'path';
import { MessageDto } from '../message/dto/message.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendNewUserEmail(data: NewUserDto) {
    try {
      await this.mailService.sendMail({
        from: 'calliestoscup@gmail.com>', // sender address
        to: 'calliestoscup@gmail.com', // receiver email
        subject: 'Coding with Callie has a new user 🥳', // Subject line
        text: '',
        attachments: [
          {
            filename: 'slothblue.png',
            path: path.join(__dirname, '/slothblue.png'),
            cid: 'logo',
          },
        ],
        html: newUserTemplate(data),
      });

      return 'message sent';
    } catch (error) {
      console.error('There was an error emailing a new user:', error.message);
    }
  }

  async sendNewMessageEmail(data: MessageDto) {
    try {
      await this.mailService.sendMail({
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
        html: newMessageTemplate(data),
      });

      return 'message sent';
    } catch (error) {
      console.error('There was an error emailing a message:', error.message);
    }
  }

  async sendEmailToNewUser(data: NewUserDto) {
    try {
      await this.mailService.sendMail({
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : data.email, // receiver email
        subject: 'Welcome to the Coding with Callie community 👋🏻', // Subject line
        text: '',
        attachments: [
          {
            filename: 'slothblue.png',
            path: path.join(__dirname, '/slothblue.png'),
            cid: 'logo',
          },
        ],
        html: messageToNewUserTemplate(data),
      });

      return 'message sent';
    } catch (error) {
      console.error('There was an error emailing a new user:', error.message);
    }
  }

  async sendPasswordResetEmail(
    email: string,
    access_token: string,
    id: number,
  ) {
    try {
      await this.mailService.sendMail({
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : email, // receiver email
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

      return 'message sent';
    } catch (error) {
      console.error(
        'There was an error sending a password reset email:',
        error.message,
      );
    }
  }
}
