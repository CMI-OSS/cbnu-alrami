import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtGuard } from "./@guard/jwt.guard";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import { FcmModule } from './fcm/fcm.module';

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
        entities: [ `${__dirname}/@entities/*.js` ],
      }),
      inject: [ ConfigService ],
    }),
    FcmModule, AuthModule
  ],
  providers: [ {
    provide: APP_GUARD,
    useClass: JwtGuard
  } ]
})
export class AppModule {}
