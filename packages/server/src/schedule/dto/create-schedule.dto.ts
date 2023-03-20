import { OmitType } from "@nestjs/swagger";

import { Schedule } from "../entities/schedule.entity";

export class CreateScheduleDto extends OmitType(Schedule, [
  "id",
  "createdDateTime",
]) {}
