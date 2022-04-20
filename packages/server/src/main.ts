import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import * as express from "express";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filter/http.exception.filter";
import getConfiguration from "./commons/config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(getConfiguration().http.port);
}
bootstrap();
