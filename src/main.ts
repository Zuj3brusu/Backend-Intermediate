import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var proxy = require('express-http-proxy');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/proxy', proxy("www.google.com"));
  // global prefix
  // app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
