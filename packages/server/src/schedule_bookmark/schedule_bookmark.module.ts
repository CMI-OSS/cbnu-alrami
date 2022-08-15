import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchedulesModule } from "src/schedule/schedule.module";

import { ScheduleBookmarkController } from "./schedule_bookmark.controller";
import { ScheduleBookmarkRepository } from "./schedule_bookmark.repository";
import { ScheduleBookmarkService } from "./schedule_bookmark.service";

@Module({
  imports: [
    SchedulesModule,
    TypeOrmModule.forFeature([ ScheduleBookmarkRepository ]),
  ],
  controllers: [ ScheduleBookmarkController ],
  providers: [ ScheduleBookmarkService ],
  exports: [ ScheduleBookmarkService ],
})
export class ScheduleBookmarkModule {}
