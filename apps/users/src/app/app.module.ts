import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { User, Profile } from '@common/entity';
import { jwtConfig, typeOrmConfig, registerRabbitMQ, registerRedis } from '@common/config';
import { RMQ_CLIENT, RMQ_QUEUE } from '@common/constant';
import { RedisService, BcryptService } from '@common/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([User, Profile]),
    ClientsModule.registerAsync([
      registerRabbitMQ(RMQ_CLIENT.MAIL, RMQ_QUEUE.MAIL),
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppRepository,
    registerRedis(),
    RedisService,
    BcryptService,
  ],
})
export class AppModule { }
