import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import * as express from "express";
import helmet from "helmet";
import { initializeTransactionalContext } from "typeorm-transactional-cls-hooked";

import { AppModule } from "./app.module";
import getConfiguration from "./commons/config/configuration";
import { SwaggerConfig } from "./commons/config/swagger.config";
import { HttpExceptionFilter } from "./commons/filter/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeTransactionalContext();
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: "*",
  });
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  SwaggerConfig(app);
  await app.listen(getConfiguration().http.port);
}

bootstrap();
