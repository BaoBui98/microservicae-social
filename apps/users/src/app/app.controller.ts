import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constant';
import { EmailDto, ForgotPasswordDto, GetUserDto, LoginDto, SignUpDto } from '@common/dto';
import { MicroserviceExceptionFilter } from '@common/exception';


@UseFilters(MicroserviceExceptionFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @MessagePattern(TCP_REQUEST_MESSAGE.USER.GET_ALL)
  getData(@Payload() query: GetUserDto) {
    return {
      query,
    };
  }
  @MessagePattern(TCP_REQUEST_MESSAGE.USER.CREATE)
  signUp(@Payload() body: SignUpDto) {
    return this.appService.register(body);
  }
  @MessagePattern(TCP_REQUEST_MESSAGE.USER.LOGIN)
  login(@Payload() body: LoginDto) {
    return this.appService.login(body);
  }
  @MessagePattern(TCP_REQUEST_MESSAGE.USER.GET_BY_EMAIL)
  async getById(@Payload() email: string) {
    const res = await this.appService.findByEmail(email);
    const { password, ...user } = res;
    return user;
  }
  @MessagePattern(TCP_REQUEST_MESSAGE.USER.VERIFY_EMAIL)
  async verifyEmail(@Payload() body: EmailDto) {
    return await this.appService.verifyEmail(body);
  }
  @MessagePattern(TCP_REQUEST_MESSAGE.USER.FORGOT_PASSWORD)
  async forgotPassword(@Payload() body: ForgotPasswordDto) {
    return await this.appService.forgotPassword(body);
  }
}
