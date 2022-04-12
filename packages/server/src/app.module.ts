import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "./config/configuration";
import { FcmModule } from './fcm/fcm.module';
import { AwsModule } from "./aws/aws.module";

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
        entities: [ "@entities/*.js" ],
      }),
      inject: [ ConfigService ],
    }),
    FcmModule,
    AwsModule
  ],
})
export class AppModule {}
