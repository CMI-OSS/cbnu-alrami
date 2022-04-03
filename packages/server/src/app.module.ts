import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { FcmModule } from './fcm/fcm.module';

@Module({
  imports: [ConfigModule.register(process.env.NODE_ENV), FcmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
