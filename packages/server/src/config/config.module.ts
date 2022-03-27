import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
})
export class ConfigModule {
  static register(option: string):DynamicModule {
    return{
      module: ConfigModule,
      providers: [ConfigService, {
        provide:'CONFIG_OPTION',
        useValue: option
      }],
      exports: [ConfigService]
    }
  }
}
