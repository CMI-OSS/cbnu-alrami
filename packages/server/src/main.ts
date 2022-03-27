import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getConfiguration from './config/configuration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(getConfiguration(process.env.NODE_ENV).http.port);
}
bootstrap();
