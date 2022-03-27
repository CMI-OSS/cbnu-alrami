import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import configuration from './@config/configuration';
@Module({
  imports: [    ConfigModule.forRoot({   
    isGlobal: true,
    load: [configuration],
  }), 
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config:ConfigService)=> ({...config.get('db'), entities: ["@entities/*.js"]}),
    inject: [ConfigService]
  }), UserModule, AdminModule, AuthModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
