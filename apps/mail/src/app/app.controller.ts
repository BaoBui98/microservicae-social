import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGE } from '@common/constant';
import { EmailDto, ResponseVerifyEmailDto } from '@common/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern(RMQ_MESSAGE.MAIL.SEND)
  async send(@Payload() data: EmailDto | ResponseVerifyEmailDto) {
    return this.appService.sendMail(data)
  }
}
