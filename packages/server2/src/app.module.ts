import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleModule } from "./article/article.module";
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
        entities: [],
        ...configService.get("db"),
        synchronize: true,
      }),
      inject: [ ConfigService ],
    }),
  ],
  providers: [],
})
export class AppModule {}
