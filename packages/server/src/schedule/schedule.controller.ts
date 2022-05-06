import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Public } from "../commons/decorators/public.decorator";
import { Schedule } from "../commons/entities/schedule.entity";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";
import { ScheduleService } from "./schedule.service";

@Controller()
@ApiTags("[schedule] 학사 일정 API")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Public()
  @Get("schedules")
  @ApiOperation({
    summary: "학사 일정 조회 API",
    description: "주어진 범위의 학사 일정을 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "범위 안의 학사 일정 객체",
    type: Schedule,
    isArray: true,
  })
  getSchedule(
    @Query() getScheduleRequestDto: GetSchedulesRequestDto,
  ): Promise<Schedule[]> {
    return this.scheduleService.getSchedules(getScheduleRequestDto);
  }
}
