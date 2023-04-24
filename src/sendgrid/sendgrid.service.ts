/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  async sendEmail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      text,
      html,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }
}
