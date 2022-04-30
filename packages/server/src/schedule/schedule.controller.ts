import { Controller, Get, Query } from "@nestjs/common";

import { Public } from "../commons/decorators/public.decorator";
import { Schedule } from "../commons/entities/schedule.entity";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";
import { ScheduleService } from "./schedule.service";

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Public()
  @Get("schedules")
  getSchedule(
    @Query() getScheduleRequestDto: GetSchedulesRequestDto,
  ): Promise<Schedule[]> {
    return this.scheduleService.getSchedules(getScheduleRequestDto);
  }
}
