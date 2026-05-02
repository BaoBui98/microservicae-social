import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constant';
import { CreatePostDto } from '@common/dto';
import { IPost } from '@common/interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @MessagePattern(TCP_REQUEST_MESSAGE.POST.CREATE)
  getData(@Payload() body: IPost) {
    return this.appService.createPost(body);
  }
}
