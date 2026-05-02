import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGE } from '@common/constant';
import { EmailDto } from '@common/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern(RMQ_MESSAGE.MAIL.SEND)
  async send(@Payload() data: EmailDto) {
    // return this.appService.sendMail(data.email, 'Hello from NestJS', '<h1>Test email from SendGrid</h1>',);
    return this.appService.sendMail(data)
  }
}
