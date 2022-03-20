import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
@Module({
  imports: [    ConfigModule.forRoot({   
    isGlobal: true,
    load: [configuration],
  }), 
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config:ConfigService)=> config.get('db'),
    inject: [ConfigService]
  })],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
