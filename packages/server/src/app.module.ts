import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [ConfigModule.register(process.env.NODE_ENV)],
  controllers: [],
  providers: [],
})
export class AppModule {}
