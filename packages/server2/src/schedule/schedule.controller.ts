import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SuperGuard } from "src/admin/gurads/super.guard";
import { MutationResponse } from "src/common/types/response";
import { User } from "src/user/entities/user.entity";
import { UserSession } from "src/user/user.decoratoer";
import { UserHeader } from "src/user/user.gurad";

import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { GetScheduleDto } from "./dto/get-schedule.dto";
import { Schedule } from "./entities/schedule.entity";
import { ScheduleService } from "./schedule.service";
import {
  BookmarkSchedule,
  CreateSchedule,
  GetBookmarkSchedule,
  GetSchedule,
  IsHolidaySchedule,
  UnBookmarkSchedule,
} from "./schedule.swagger";

@ApiTags("[schedule] 일정 API")
@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @SuperGuard()
  @CreateSchedule()
  @Post()
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<MutationResponse> {
    return { success: !!this.scheduleService.create(createScheduleDto) };
  }

  @GetSchedule()
  @Get()
  findAll(@Query() getScheduleDto: GetScheduleDto) {
    console.log({ getScheduleDto });
    return this.scheduleService.findAll(getScheduleDto);
  }

  @GetBookmarkSchedule()
  @UserHeader
  @Get("bookmark")
  findBookmarkSchedule(@UserSession() user?: User) {
    return user ? this.scheduleService.findBookmarkSchedules(user) : [];
  }

  @BookmarkSchedule()
  @Post(":id/bookmark")
  async bookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.scheduleService.bookmark(id, user)),
    };
  }

  @UnBookmarkSchedule()
  @Delete(":id/bookmark")
  async unbookmark(
    @Param("id") id: number,
    @UserSession() user: User,
  ): Promise<MutationResponse> {
    return {
      success: !!(await this.scheduleService.unbookmark(id, user)),
    };
  }

  @IsHolidaySchedule()
  @Get("holiday/:date")
  async isHoliday(@Param("date") date: string): Promise<Partial<Schedule>> {
    return this.scheduleService.isHoliday(date);
  }
}
