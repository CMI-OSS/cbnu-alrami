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
import { User } from "src/commons/entities/user.entity";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";

import { UserSession } from "../commons/decorators/user-session.decorator";
import { SubscribeService } from "./subscribe.service";

@Controller()
@ApiTags("[subscribe] 공지사항 사이트 구독 관련 API")
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post("subscribe/boards/:boardId")
  @ApiOperation({
    summary: "공지사항 사이트 구독 API",
    description: "특정 board를 구독합니다.",
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
  async create(@Req() req, @Param("boardId") boardId: number) {
    const { user } = req;
    return this.subscribeService.create(user, boardId);
  }

  @Delete("subscribe/boards/:boardId")
  @ApiOperation({
    summary: "공지사항 사이트 구독 해제 API",
    description: "특정 board를 구독 해제 합니다.",
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
  async remove(@Req() req, @Param("boardId") boardId: number) {
    const { user } = req;
    return this.subscribeService.remove(user, boardId);
  }

  @Post("/notice/boards/:boardId")
  @ApiOperation({
    summary: "공지사항 사이트 알림 설정 API",
    description: "특정 board의 업데이트 알림을 받도록 설정합니다.",
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
  async createNotice(@Req() req, @Param("boardId") boardId: number) {
    const { user } = req;
    return this.subscribeService.updateNotice(user, boardId, true);
  }

  @Delete("/notice/boards/:boardId")
  @ApiOperation({
    summary: "공지사항 사이트 알림 해제 API",
    description: "특정 board의 업데이트 알림을 받지 않도록 설정합니다.",
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
  async deleteNotice(@Req() req, @Param("boardId") boardId: number) {
    const { user } = req;
    return this.subscribeService.updateNotice(user, boardId, false);
  }

  @Get("subscribe/boards/info")
  @ApiOperation({
    summary: "공지사항 사이트 구독 & 알림 정보 조회 API",
    description:
      "로그인 한 유저가 구독 & 알림 설정한 공지사항 사이트 리스트를 조회합니다.",
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
  async findAllSubscribeAndNotice(@UserSession() user: User) {
    return this.subscribeService.findAllSubscribeAndNotice(user);
  }
}
