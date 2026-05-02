import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { User, Profile } from '@common/entity';
import { DataSource } from 'typeorm';
import { TCP_REQUEST_MESSAGE, RMQ_CLIENT, RMQ_MESSAGE, EMAIL_ACTION } from '@common/constant';
import { AppRepository } from './app.repository';
import { LoginDto, SignUpDto } from '@common/dto';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appRepository: AppRepository,
    private readonly dataSource: DataSource,
    @Inject(RMQ_CLIENT.MAIL) private readonly mailClient: ClientProxy,
  ) { }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async login(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.appRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(data.password, user.password);

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

      const hashedPassword = await this.hashPassword(data.password);

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

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async findByEmail(email: string): Promise<User> {
    return this.appRepository.findByEmail(email);
  }
}
