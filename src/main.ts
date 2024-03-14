import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');

  app.useGlobalPipes(new ValidationPipe({transform:true, whitelist: true, forbidNonWhitelisted: true}))

  await app.listen(port);
}
bootstrap();
