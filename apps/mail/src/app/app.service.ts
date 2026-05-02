import { Injectable } from '@nestjs/common';

import sgMail from '@sendgrid/mail';


import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(
      this.configService.get<string>('SENDGRID_API_KEY')!,
    );
  }
  async sendMail(email: string, subject: string, html: string) {
    await sgMail.send({
      to: email,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL')!,
      subject,
      html,
    });
    return {
      message: 'Email sent successfully',
    };
  }
}
