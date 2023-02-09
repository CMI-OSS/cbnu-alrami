import { PickType } from "@nestjs/swagger";

import { Schedule } from "../entities/schedule.entity";

export class GetScheduleDto extends PickType(Schedule, [
  "startDateTime",
  "endDateTime",
]) {}
