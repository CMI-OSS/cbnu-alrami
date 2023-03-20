import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Schedule } from "./entities/schedule.entity";
import { ScheduleController } from "./schedule.controller";
import { ScheduleService } from "./schedule.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ Schedule ]), HttpModule ],
  controllers: [ ScheduleController ],
  providers: [ ScheduleService ],
})
export class ScheduleModule {}
