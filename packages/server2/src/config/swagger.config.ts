import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function SwaggerConfig(app: INestApplication): void {
  if (process.env.NODE_ENV !== "production") {
    const options = new DocumentBuilder()
      .setTitle("충림이 Server API Docs")
      .setDescription("충림이 프로젝트의 REST API 문서")
      .setVersion("1.0.0")
      .addBearerAuth(
        { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        "access-token",
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api-docs", app, document);
  }
}
