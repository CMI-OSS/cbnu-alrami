import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import { json, urlencoded } from "express";

import { AppModule } from "./app.module";
import configuration from "./config/configuration";
import { SwaggerConfig } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  SwaggerConfig(app);

  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(compression()); // Gzip 압축 적용

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(configuration.server.port);
}
bootstrap();

process.on("uncaughtException", (err) => {
  console.log("Caught exception: ", err);
});
