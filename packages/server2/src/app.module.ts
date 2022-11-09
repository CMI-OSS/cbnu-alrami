import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleModule } from "./article/article.module";

@Module({
  imports: [
    ArticleModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      entities: [],
      synchronize: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
