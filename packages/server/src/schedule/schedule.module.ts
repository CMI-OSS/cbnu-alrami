import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ScheduleController } from "./schedule.controller";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleService } from "./schedule.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ ScheduleRepository ]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [ ScheduleService ],
  controllers: [ ScheduleController ],
  exports: [ ScheduleService ],
})
export class SchedulesModule {}
