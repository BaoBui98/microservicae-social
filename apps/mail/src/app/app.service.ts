import { Injectable } from '@nestjs/common';

import sgMail from '@sendgrid/mail';


import { ConfigService } from '@nestjs/config';
import { EmailDto } from '@common/dto';
import { EMAIL_ACTION } from '@common/constant';

import { getRegisterEmailTemplate } from '../html/register';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(
      this.configService.get<string>('SENDGRID_API_KEY')!,
    );
  }
  async sendMail(data: EmailDto) {
    switch (data.action) {
      case EMAIL_ACTION.REGISTER:
        await this.registerEmail(data);
        break;
      default:
        throw new Error('Invalid action');
    }

  }
  private async registerEmail(data: EmailDto) {
    const htmlContent = getRegisterEmailTemplate(data.email);
    await sgMail.send({
      to: data.email,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL')!,
      subject: "Verify your email address",
      html: htmlContent,
    });
    return {
      message: 'Email sent successfully',
    };
  }
}
