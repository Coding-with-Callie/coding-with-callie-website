import { Injectable } from '@nestjs/common';
import { SENDMAIL } from './mail';
import { HTML_TEMPLATE as newMessageTemplate } from './new-message-mail-template';
import { HTML_TEMPLATE as newUserTemplate } from './new-user-mail-template';
import { HTML_TEMPLATE as messageToNewUserTemplate } from './message-to-new-user';
import { HTML_TEMPLATE as resetPasswordTemplate } from './reset-password-template';
import { HTML_TEMPLATE as newSubmissionTemplate } from './new-submission-template';
import { HTML_TEMPLATE as newFeedbackTemplate } from './new-feedback-template';
import { HTML_TEMPLATE_1 as newFeedbackGivenTemplate1 } from './new-feedback-given-template';
import { HTML_TEMPLATE_2 as newFeedbackGivenTemplate2 } from './new-feedback-given-template';
import { HTML_TEMPLATE as purchaseConfirmationTemplate } from './purchase-confirmation-template';
import { HTML_TEMPLATE as newPurchaseTemplate } from './new-purchase-template';
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

  async sendNewSubmissionEmail(data) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : data.user.email, // receiver email
        subject: `${data.workshop}: Session ${data.session} Deliverable Submitted 🥳`, // Subject line
        text: '',
        attachments: [
          {
            filename: 'slothblue.png',
            path: path.join(__dirname, '/slothblue.png'),
            cid: 'logo',
          },
        ],
        html: newSubmissionTemplate(data),
      },
      () => {
        console.log('submission email sent to user');
      },
    );
  }

  async sendNewFeedbackGivenEmail(data) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : data.feedbackProvider.email, // receiver email
        subject: `${data.workshop}: Session ${data.session} Feedback Submitted 🥳`, // Subject line
        text: '',
        attachments: [
          {
            filename: 'slothblue.png',
            path: path.join(__dirname, '/slothblue.png'),
            cid: 'logo',
          },
        ],
        html:
          data.feedbackProvider.feedback.length === 0
            ? newFeedbackGivenTemplate1(data)
            : newFeedbackGivenTemplate2(data),
      },
      () => {
        console.log('new feedback given email sent to user');
      },
    );
  }

  async sendFeedbackEmail(data) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : data.user.email, // receiver email
        subject: `Coding with Callie: You have new feedback! 🥳`, // Subject line
        text: '',
        attachments: [
          {
            filename: 'slothblue.png',
            path: path.join(__dirname, '/slothblue.png'),
            cid: 'logo',
          },
        ],
        html: newFeedbackTemplate(data),
      },
      () => {
        console.log('new feedback email sent to user');
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

  async sendPurchaseConfirmationEmail(
    workshopName,
    workshopId,
    userName,
    email,
  ) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to:
          process.env.ENVIRONMENT === 'local'
            ? 'calliestoscup@gmail.com'
            : email, // receiver email
        subject: 'Coding with Callie: Thank you for your purchase!', // Subject line
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
        html: purchaseConfirmationTemplate(workshopName, workshopId, userName),
      },
      () => {
        console.log('purchase confirmation email sent');
      },
    );
  }

  async sendNewPurchaseEmail(workshopName, userName) {
    SENDMAIL(
      {
        from: 'calliestoscup@gmail.com>', // sender address
        to: 'calliestoscup@gmail.com', // receiver email
        subject: 'Coding with Callie: You have a new purchase 🥳', // Subject line
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
        html: newPurchaseTemplate(workshopName, userName),
      },
      () => {
        console.log('new purchase email sent');
      },
    );
  }
}
