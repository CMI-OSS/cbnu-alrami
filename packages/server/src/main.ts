import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import * as express from "express";
import * as expressBasicAuth from "express-basic-auth";
import helmet from "helmet";

import { AppModule } from "./app.module";
import getConfiguration from "./commons/config/configuration";
import { SwaggerConfig } from "./commons/config/swagger.config";
import { HttpExceptionFilter } from "./commons/filter/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    [ "/api-docs" ],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_ID]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  SwaggerConfig(app);
  await app.listen(getConfiguration().http.port);
}
bootstrap();
