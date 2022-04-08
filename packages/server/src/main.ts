import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import * as csurf from "csurf";
import * as compression from "compression";
import { AppModule } from "./app.module";
import getConfiguration from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(csurf());
  app.use(compression());
  await app.listen(getConfiguration().http.port);

  // console.log(getConfiguration());   //환경변수 로딩 확인 코드
}
bootstrap();
