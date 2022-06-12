import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { InjectConnection, TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { AuthModule } from "./auth/auth.module";
import { AwsModule } from "./aws/aws.module";
import { BoardModule } from "./board/board.module";
import { BoardTreeModule } from "./boardTree/boardTree.module";
import { CafeteriaModule } from "./cafeteria/cafeteria.module";
import configuration from "./commons/config/configuration";
import { initialize } from "./commons/factories/initialize";
import { JwtGuard } from "./commons/guards/jwt.guard";
import { FcmModule } from "./fcm/fcm.module";
import { PlaceModule } from "./place/place.module";
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
        namingStrategy: new SnakeNamingStrategy(),
        charset: "utf8",
        logging: [ "query" ],
      }),
      inject: [ ConfigService ],
    }),
    FcmModule,
    AuthModule,
    AwsModule,
    BoardTreeModule,
    BoardModule,
    CafeteriaModule,
    PlaceModule,
    ScheduleModule,
    WeatherModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {
  constructor(@InjectConnection() private connection: Connection) {
    initialize(this.connection);
  }
}
