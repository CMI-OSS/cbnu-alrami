import { PickType } from "@nestjs/mapped-types";

import { Schedule } from "../../commons/entities/schedule.entity";

export class CreateSchedulesRequestDto extends PickType(Schedule, [
  "content",
  "priority",
  "isHoliday",
  "startDate",
  "endDate",
]) {}
