import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InjectConnection, TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { AuthModule } from "./auth/auth.module";
import { AwsModule } from "./aws/aws.module";
import { BoardModule } from "./board/board.module";
import { BoardTreeModule } from "./boardTree/boardTree.module";
import configuration from "./commons/config/configuration";
import { initialize } from "./commons/factories/initialize";
import { FcmModule } from "./fcm/fcm.module";
<<<<<<< Updated upstream
import { ScheduleModule } from "./schedule/schedule.module";
import { WeatherModule } from "./weather/weather.module";
=======
import { PlaceModule } from "./place/place.module";
>>>>>>> Stashed changes

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
    ScheduleModule,
    WeatherModule,
  ],
})
export class AppModule {
  constructor(@InjectConnection() private connection: Connection) {
    initialize(this.connection);
  }
}
