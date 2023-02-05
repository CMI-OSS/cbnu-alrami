import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SuperGuard } from "src/admin/gurads/super.guard";
import { MutationResponse } from "src/common/types/response";

import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { GetScheduleDto } from "./dto/get-schedule.dto";
import { ScheduleService } from "./schedule.service";
import { CreateSchdule, GetSchedule } from "./schedule.swagger";

@ApiTags("[schedule] 일정 API")
@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @SuperGuard()
  @CreateSchdule()
  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<MutationResponse> {
    return { success: !!this.scheduleService.create(createScheduleDto) };
  }

  @GetSchedule()
  @Get()
  findAll(@Query() getScheduleDto: GetScheduleDto) {
    return this.scheduleService.findAll(getScheduleDto);
  }
}
