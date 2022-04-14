import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from "./board/board.module";
import configuration from "./config/configuration";
import { FcmModule } from './fcm/fcm.module';
<<<<<<< HEAD
import ResponseExceptionFilter from "./common/exception/response.exception.filter";
=======
import { AwsModule } from "./aws/aws.module";
>>>>>>> 662a75d93727da2f416b825b992e6e8edb402c18

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
<<<<<<< HEAD
    BoardModule
=======
    AwsModule
>>>>>>> 662a75d93727da2f416b825b992e6e8edb402c18
  ],

  providers: [
    {
      provide: APP_FILTER,
      useClass: ResponseExceptionFilter,
    },
  ]
})
export class AppModule {}
