import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WeatherController } from "./weather.controller";
import { WeatherRepository } from "./weather.repository";
import { WeatherService } from "./weather.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ WeatherRepository ]) ],
  providers: [ WeatherService ],
  controllers: [ WeatherController ],
})
export class WeatherModule {}
