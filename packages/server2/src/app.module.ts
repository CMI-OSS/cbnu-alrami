import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { ArticleModule } from "./article/article.module";
import { Article } from "./article/entities/article.entity";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ () => configuration ],
    }),
    ArticleModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (configService: ConfigService) => ({
        ...configService.get("db"),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [ Article ],
        synchronize: true,
      }),
      inject: [ ConfigService ],
    }),
  ],
  providers: [],
})
export class AppModule {}
