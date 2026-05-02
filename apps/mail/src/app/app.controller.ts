import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constant';
import { EmailDto } from '@common/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern(TCP_REQUEST_MESSAGE.MAIL.SEND)
  async send(@Payload() data: EmailDto) {
    return this.appService.sendMail(data.email, 'Hello from NestJS', '<h1>Test email from SendGrid</h1>',);
  }
}
