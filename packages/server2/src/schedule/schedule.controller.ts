import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { GetScheduleDto } from "./dto/get-schedule.dto";
import { Schedule } from "./entities/schedule.entity";
import { ScheduleService } from "./schedule.service";
import { CreateSchdule, GetSchedule } from "./schedule.swagger";

@ApiTags("[schedule] 일정 API")
@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @CreateSchdule()
  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @GetSchedule()
  @Get()
  findAll(@Query() getScheduleDto: GetScheduleDto) {
    return this.scheduleService.findAll(getScheduleDto);
  }
}
