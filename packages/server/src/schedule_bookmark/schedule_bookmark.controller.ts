import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

import { Schedule } from "../commons/entities/schedule.entity";
import { ScheduleBookmarkService } from "./schedule_bookmark.service";

@Controller("bookmark")
@ApiTags("[schedule] 스케줄 북마크 API")
export class ScheduleBookmarkController {
  constructor(
    private readonly scheduleBookmarkService: ScheduleBookmarkService,
  ) {}

  @Post("schedule/:scheduleId")
  @ApiOperation({
    summary: "스케줄 북마크 ON API",
    description: "특정 유저가 북마크한 스케줄을 저장합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "성공 여부",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  async create(@Req() req, @Param("scheduleId") scheduleId: number) {
    const { user } = req;
    return this.scheduleBookmarkService.create(user, scheduleId);
  }

  @Delete("schedule/:scheduleId")
  @ApiOperation({
    summary: "스케줄 북마크 OFF API",
    description: "특정 유저가 북마크한 스케줄을 삭제합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "성공 여부",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  async remove(@Req() req, @Param("scheduleId") scheduleId: number) {
    const { user } = req;
    return this.scheduleBookmarkService.remove(user, scheduleId);
  }

  @ApiOperation({
    summary: "북마크한 학사 일정 조회",
    description: "특정 유저가 북마크한 학사 일정을 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "성공 여부",
  })
  @ApiHeader({
    name: "uuid",
    description: "user uuid",
  })
  @UseGuards(UserAuthGuard)
  @Get("schedules")
  async find(@Req() req): Promise<Schedule[]> {
    const { user } = req;

    return this.scheduleBookmarkService.find(user);
  }
}
