import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import serverless from 'serverless-http';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  await app.init();
  return serverless(expressApp);
}

let server: any;

export const handler = async (event: any, context: any) => {
  try {
    if (!server) {
      server = await bootstrap();
    }
    return server(event, context);
  } catch (err) {
    console.error(err);
  }
};
