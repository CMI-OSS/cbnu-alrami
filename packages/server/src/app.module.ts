import { CacheModule, MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { BoardAuthorityModule } from "./board-authority/board-authority.module";
import { BoardModule } from "./board/board.module";
import { BoardTreeModule } from "./boardTree/boardTree.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { CafeteriaModule } from "./cafeteria/cafeteria.module";
import configuration from "./commons/config/configuration";
import { ACCESS_PRIVATE_KEY } from "./commons/constants/constants";
import { AuthMiddleware } from "./commons/middlewares/auth.middleware";
import { FcmModule } from "./fcm/fcm.module";
import { HitModule } from "./hit/hit.module";
import { ImageModule } from "./image/image.module";
import { PlaceModule } from "./place/place.module";
import { SchedulesModule } from "./schedule/schedule.module";
import { ScheduleBookmarkModule } from "./schedule_bookmark/schedule_bookmark.module";
import { SubscribeModule } from "./subscribe/subscribe.module";
import { UserModule } from "./user/user.module";
import { WeatherModule } from "./weather/weather.module";

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600, // seconds
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ configuration ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (config: ConfigService) => {
        return {
          ...config.get("db"),
          entities: [ `${__dirname}/commons/entities/*.js` ],
          namingStrategy: new SnakeNamingStrategy(),
          charset: "utf8",
          logging: [ "query" ],
        };
      },
      inject: [ ConfigService ],
    }),
    FcmModule,
    AuthModule,
    ArticleModule,
    ImageModule,
    BoardTreeModule,
    BoardModule,
    BookmarkModule,
    ScheduleBookmarkModule,
    UserModule,
    CafeteriaModule,
    PlaceModule,
    SchedulesModule,
    SubscribeModule,
    WeatherModule,
    HitModule,
    JwtModule.register({
      secret: ACCESS_PRIVATE_KEY,
      signOptions: { expiresIn: "60m" },
    }),
    BoardAuthorityModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
