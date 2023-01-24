import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Weather } from "./entities/weather.entity";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";

@Module({
  imports: [ HttpModule, TypeOrmModule.forFeature([ Weather ]) ],
  providers: [ WeatherService ],
  controllers: [ WeatherController ],
})
export class WeatherModule {}
