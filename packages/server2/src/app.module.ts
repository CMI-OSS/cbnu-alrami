import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule as NestScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/entities/admin.entity";
import { ArticleModule } from "./article/article.module";
import { Article } from "./article/entities/article.entity";
import { AwsModule } from "./aws/aws.module";
import { BoardAuthorityModule } from "./board-authority/board-authority.module";
import { BoardAuthority } from "./board-authority/entities/board-authority.entity";
import { BoardModule } from "./board/board.module";
import { Board } from "./board/entities/board.entity";
import { SubscribeBoard } from "./board/entities/subscribe-board.entity";
import { CafeteriaMenuModule } from "./cafeteria-menu/cafeteria-menu.module";
import { CafeteriaMenu } from "./cafeteria-menu/entities/cafeteria-menu.entity";
import configuration from "./config/configuration";
import { FcmModule } from "./fcm/fcm.module";
import { Image } from "./image/entities/image.entity";
import { ImageModule } from "./image/image.module";
import { Place } from "./place/entities/place.entity";
import { PlaceModule } from "./place/place.module";
import { Schedule } from "./schedule/entities/schedule.entity";
import { ScheduleModule } from "./schedule/schedule.module";
import { School } from "./school/entities/school.entity";
import { SchoolModule } from "./school/school.module";
import { User } from "./user/entities/user.entity";
import { UserMiddleWare } from "./user/user.middleware";
import { UserModule } from "./user/user.module";
import { Weather } from "./weather/entities/weather.entity";
import { WeatherModule } from "./weather/weather.module";

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
        entities: [
          User,
          Article,
          Admin,
          Board,
          BoardAuthority,
          Schedule,
          Image,
          Place,
          School,
          CafeteriaMenu,
          SubscribeBoard,
          Weather,
        ],
        synchronize: configuration.db.synchronize,
      }),
      inject: [ ConfigService ],
    }),
    BoardModule,
    AdminModule,
    BoardAuthorityModule,
    ScheduleModule,
    ImageModule,
    AwsModule,
    PlaceModule,
    SchoolModule,
    CafeteriaMenuModule,
    UserModule,
    WeatherModule,
    NestScheduleModule.forRoot(),
    FcmModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleWare).forRoutes("*");
  }
}
