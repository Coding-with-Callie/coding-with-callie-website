import { Injectable } from '@nestjs/common';
import { SENDMAIL } from './mail';
import { HTML_TEMPLATE as newMessageTemplate } from './new-message-mail-template';
import { HTML_TEMPLATE as newUserTemplate } from './new-user-mail-template';
import { HTML_TEMPLATE as messageToNewUserTemplate } from './message-to-new-user';
import { HTML_TEMPLATE as resetPasswordTemplate } from './reset-password-template';

@Injectable()
export class MailService {
  async sendNewUserEmail(data) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to: 'calliestoscup@gmail.com', // receiver email
        subject: 'Coding with Callie has a new user 🥳', // Subject line
        text: '',
        html: newUserTemplate(data),
      },
      (info) => {
        console.log(`INFO`, info);
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
        html: newMessageTemplate(data),
      },
      (info) => {
        console.log(`INFO`, info);
      },
    );
  }

  async sendEmailToNewUser(data) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to: data.email, // receiver email
        subject: 'Welcome to the Coding with Callie community 👋🏻', // Subject line
        text: '',
        html: messageToNewUserTemplate(data),
      },
      (info) => {
        console.log(`INFO`, info);
      },
    );
  }

  async sendPasswordResetEmail(user, access_token) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : user.email, // receiver email
        subject: 'Reset Your Password', // Subject line
        text: '',
        html: resetPasswordTemplate(access_token),
      },
      (info) => {
        console.log(`INFO`, info);
      },
    );
  }
}
