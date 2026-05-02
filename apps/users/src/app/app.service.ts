import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { User, Profile } from '@common/entity';
import { DataSource } from 'typeorm';
import { TCP_REQUEST_MESSAGE, RMQ_CLIENT, RMQ_MESSAGE, EMAIL_ACTION } from '@common/constant';
import { AppRepository } from './app.repository';
import { EmailDto, ForgotPasswordDto, LoginDto, SignUpDto } from '@common/dto';
import { RedisService, BcryptService } from '@common/services';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appRepository: AppRepository,
    private readonly dataSource: DataSource,
    @Inject(RMQ_CLIENT.MAIL) private readonly mailClient: ClientProxy,
    private readonly redisService: RedisService,
    private readonly bcryptService: BcryptService,
  ) { }



  async login(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.appRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await this.bcryptService.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const payload = {
      email: user.email,
      id: user.id,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: SignUpDto): Promise<Omit<User, 'password'>> {

    try {

      const hashedPassword = await this.bcryptService.hash(data.password);

      const newUser = await this.dataSource.transaction(async (manager) => {
        // Create Profile first
        const profile = manager.create(Profile, {
          coin: 0,
          avatar: null,
          gender: data.gender,
        });
        await manager.save(profile);

        // Create User and link Profile
        const user = manager.create(User, {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          role: data.role,
          profile: profile,
        });
        return await manager.save(user);
      });

      const { password, ...result } = newUser;

      this.mailClient.emit(RMQ_MESSAGE.MAIL.SEND, { email: result.email, action: EMAIL_ACTION.REGISTER });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.appRepository.findByEmail(email);
  }
  async verifyEmail(body: EmailDto) {
    const user = await this.appRepository.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { rawOtp, hashedOtp } = await this.createOtp();
    const key = `${body.action}:${body.email}`;
    const value = { otp: hashedOtp, attempt: 0 };
    this.mailClient.emit(RMQ_MESSAGE.MAIL.SEND, { email: body.email, action: EMAIL_ACTION.VERIFY, code: rawOtp });
    await this.redisService.set(key, value, 300);
    return {
      message: 'OTP sent successfully',
    };
  }
  private async createOtp() {
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await this.bcryptService.hash(rawOtp);
    return { rawOtp, hashedOtp };
  }
  async forgotPassword(body: ForgotPasswordDto) {
    const user = await this.appRepository.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const key = `${EMAIL_ACTION.VERIFY}:${body.email}`;
    const otpData = await this.redisService.get(key) as { otp: string, attempt: number };
    if (!otpData) {
      console.log("In vao otpData failed", otpData);

      throw new UnauthorizedException('OTP has expired or does not exist');
    }
    const isMatch = await this.bcryptService.compare(body.code, otpData.otp);
    if (!isMatch) {
      await this.incrementOtpAttempt(body.email, otpData);
    }

    const hashedPassword = await this.bcryptService.hash(body.password);
    user.password = hashedPassword;
    await this.appRepository.updateUser(user);
    await this.redisService.delete(key);

    return {
      message: 'Password updated successfully',
    };
  }

  private async incrementOtpAttempt(email: string, otpData: { otp: string, attempt: number }) {
    const key = `${EMAIL_ACTION.VERIFY}:${email}`;
    otpData.attempt += 1;
    if (otpData.attempt >= 5) {
      await this.redisService.delete(key);
      throw new UnauthorizedException('Maximum OTP attempts reached. Please request a new OTP.');
    } else {
      await this.redisService.set(key, otpData, 300);
      throw new UnauthorizedException(`Invalid OTP. You have ${5 - otpData.attempt} attempts left.`);
    }
  }


}
