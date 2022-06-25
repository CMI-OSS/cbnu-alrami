import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WeatherController } from "./weather.controller";
import { WeatherRepository } from "./weather.repository";
import { WeatherService } from "./weather.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ WeatherRepository ]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [ WeatherService ],
  controllers: [ WeatherController ],
})
export class WeatherModule {}
