import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: {
    origin: ["http://localhost:3000", "*"],
    credentials: true,
    preflightContinue: false
  } });
    
  app.use(cookieParser());

  await app.listen(4001);
}
bootstrap();
