import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { AuthModule } from "./auth/auth.module";
import { AwsModule } from "./aws/aws.module";
import { BoardModule } from "./board/board.module";
import { CafeteriaModule } from "./cafeteria/cafeteria.module";
import configuration from "./commons/config/configuration";
import { JwtGuard } from "./commons/guards/jwt.guard";
import { FcmModule } from "./fcm/fcm.module";
import { PlaceModule } from './place/place.module';

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
      }),
      inject: [ ConfigService ],
    }),
    FcmModule,
    AuthModule,
    AwsModule,
    BoardModule,
    CafeteriaModule,
    PlaceModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
