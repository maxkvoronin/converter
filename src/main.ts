import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(
    `Application is running on: ${await app.getUrl()}, cwd: ${process.cwd()}, env: ${
      process.env.NODE_ENV
    }, mongo: ${process.env.MONGODB_HOST}`,
  );
}
bootstrap();
