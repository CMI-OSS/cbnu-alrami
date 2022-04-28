import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ScheduleController } from "./schedule.controller";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleService } from "./schedule.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ ScheduleRepository ]) ],
  providers: [ ScheduleService ],
  controllers: [ ScheduleController ],
})
export class ScheduleModule {}
