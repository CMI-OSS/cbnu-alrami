import { Inject, Injectable } from '@nestjs/common';
import getConfiguration from './configuration';
@Injectable()
export class ConfigService {
  private readonly configuration
  constructor(@Inject('CONFIG_OPTION')option: string){
    this.configuration = getConfiguration(option);
  }

  get(key:string):string|number{
    return this.configuration[key];
  }
}
