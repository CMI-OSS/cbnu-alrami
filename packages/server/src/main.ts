import { NestFactory } from "@nestjs/core";
import * as express from "express";
import helmet from "helmet";
import * as compression from "compression";
import { AppModule } from "./app.module";
import getConfiguration from "./@config/configuration";
import { HttpExceptionFilter } from "./common/filter/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(getConfiguration().http.port);

  // console.log(getConfiguration());   //환경변수 로딩 확인 코드
}
bootstrap();
