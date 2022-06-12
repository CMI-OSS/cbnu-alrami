import { NestFactory, Reflector } from "@nestjs/core";
import * as compression from "compression";
import * as express from "express";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filter/http.exception.filter";
import getConfiguration from "./commons/config/configuration";
import { AuthoritiesGuard } from "./commons/guards/authorities.guard";
import { JwtGuard } from "./commons/guards/jwt.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalGuards(new JwtGuard(new Reflector()));
  app.useGlobalGuards(new AuthoritiesGuard(new Reflector()));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(getConfiguration().http.port);
  
}
bootstrap();
