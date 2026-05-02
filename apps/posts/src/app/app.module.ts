import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@common/config';
import { Post, User, Profile } from '@common/entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),

  TypeOrmModule.forRootAsync(typeOrmConfig),
  TypeOrmModule.forFeature([Post, User, Profile]),],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule { }
