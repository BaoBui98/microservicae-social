/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariables } from '@common/config';
import { ResponseInterceptor } from '@common/interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const env = new EnvironmentVariables();
  const globalPrefix = env.PREFIX;
  const port = env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Social App API')
    .setDescription('API documentation for social app')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(globalPrefix)
    .build();

  const document = SwaggerModule.createDocument(app, config);


  app.setGlobalPrefix(globalPrefix);

  app.useGlobalInterceptors(new ResponseInterceptor());
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `📚 Swagger documentation: http://localhost:${port}/api-docs`,
  );
}

bootstrap();
