import { Injectable } from '@nestjs/common';
import { SENDMAIL } from './mail';
import { HTML_TEMPLATE as newMessageTemplate } from './new-message-mail-template';
import { HTML_TEMPLATE as newUserTemplate } from './new-user-mail-template';
import { HTML_TEMPLATE as messageToNewUserTemplate } from './message-to-new-user';
import { HTML_TEMPLATE as resetPasswordTemplate } from './reset-password-template';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class MailService {
  async sendNewUserEmail(data) {
    SENDMAIL(
      {
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
      },
      () => {
        console.log('new user notfication email sent');
      },
    );
  }

  async sendNewMessageEmail(data) {
    SENDMAIL(
      {
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
      },
      () => {
        console.log('new user notification email sent');
      },
    );
  }

  async sendEmailToNewUser(data) {
    SENDMAIL(
      {
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
      },
      () => {
        console.log('welcome email sent to new user');
      },
    );
  }

  async sendPasswordResetEmail(user, access_token, id) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : user.email, // receiver email
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
      },
      () => {
        console.log('reset email sent');
      },
    );
  }
}
