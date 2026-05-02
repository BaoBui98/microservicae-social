/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { EnvironmentVariables, MicroserviceKey } from '@common/config';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = new EnvironmentVariables();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: process.env[`${MicroserviceKey.MAIL}_HOST`],
      port: Number(process.env[`${MicroserviceKey.MAIL}_PORT`]),
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = env.PREFIX;
  const port = env.MAIL_PORT;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

}

bootstrap();
