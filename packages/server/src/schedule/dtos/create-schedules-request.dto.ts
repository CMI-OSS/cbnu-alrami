import { PickType } from "@nestjs/swagger";

import { Schedule } from "../../commons/entities/schedule.entity";

export class CreateSchedulesRequestDto extends PickType(Schedule, [
  "content",
  "priority",
  "isHoliday",
  "startDate",
  "endDate",
]) {}
