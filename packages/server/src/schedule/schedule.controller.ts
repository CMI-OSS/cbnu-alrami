import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Schedule } from "../commons/entities/schedule.entity";
import { CreateSchedulesRequestDto } from "./dtos/create-schedules-request.dto";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";
import { ScheduleService } from "./schedule.service";

@Controller("schedules")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiTags("[schedule] 학사 일정 API")
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

  @Post()
  @ApiTags("[admin] 관리자 API")
  @ApiOperation({
    summary: "학사일정 추가",
    description: "학사일정을 추가합니다",
  })
  @ApiBody({
    description: "학사일정 세부 정보",
    type: CreateSchedulesRequestDto,
  })
  @ApiResponse({
    status: 201,
  })
  createSchedule(
    @Body() createSchedulesRequestDto: CreateSchedulesRequestDto,
  ): Promise<void> {
    return this.scheduleService.createSchedule(createSchedulesRequestDto);
  }
}
