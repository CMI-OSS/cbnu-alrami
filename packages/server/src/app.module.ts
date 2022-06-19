import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleModule } from "./article/article.module";
import { AuthModule } from "./auth/auth.module";
import { BoardModule } from "./board/board.module";
import { BoardTreeModule } from "./boardTree/boardTree.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import configuration from "./commons/config/configuration";
import { JwtGuard } from "./commons/guards/jwt.guard";
import { FcmModule } from "./fcm/fcm.module";
import { HitModule } from "./hit/hit.module";
import { ImageModule } from "./image/image.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { WeatherModule } from "./weather/weather.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ configuration ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (config: ConfigService) => ({
        ...config.get("db"),
        entities: [ `${__dirname}/commons/entities/*.js` ],
      }),
      inject: [ ConfigService ],
    }),
    FcmModule,
    AuthModule,
    ArticleModule,
    ImageModule,
    BoardTreeModule,
    BoardModule,
    BookmarkModule,
    ScheduleModule,
    WeatherModule,
    HitModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
