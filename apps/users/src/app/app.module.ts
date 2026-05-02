import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { User, Profile } from '@common/entity';
import { jwtConfig, typeOrmConfig } from '@common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule { }
