import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export function SwaggerConfig(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("충림이 Server API Docs")
    .setDescription("충림이 프로젝트의 REST API 문서")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);
}
