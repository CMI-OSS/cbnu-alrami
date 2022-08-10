import { Injectable } from "@nestjs/common";
import { ScheduleBookmark } from "src/commons/entities/scheduleBookmark.entity";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";
import { ScheduleService } from "src/schedule/schedule.service";

import { ScheduleBookmarkRepository } from "./schedule_bookmark.repository";

const { ALREADY_SUBSCRIBE_BOOKMARK } = Errors;

@Injectable()
export class ScheduleBookmarkService {
  constructor(
    private readonly scheduleBookmarkRepository: ScheduleBookmarkRepository,
    private readonly scheduleService: ScheduleService,
  ) {}

  async create(user: User, scheduleId: number) {
    const article = await this.scheduleService.findById(scheduleId);
    // DESCRIBE: 요청한 유저가 article을 이미 구독 중인지 확인
    if (
      await this.scheduleBookmarkRepository.existsByUserAndArticle(
        1,
        scheduleId,
      )
    )
      throw ALREADY_SUBSCRIBE_BOOKMARK;

    await this.scheduleBookmarkRepository.save(article);
    return "success";
  }

  async remove(user: User, scheduleId: number) {
    // DESCRIBE: 요청한 유저가 article을 구독하고 있는지 확인

    const subscribe = await this.findByUserAndSchedule(user.id, scheduleId);
    if (!subscribe) throw ALREADY_SUBSCRIBE_BOOKMARK;

    // DESCRIBE: 이미 구독 중인 board라면 구독 해제
    await this.scheduleBookmarkRepository.delete({ id: subscribe.id });
    return "success";
  }

  async findByUserAndSchedule(
    userId: number,
    scheduleId: number,
  ): Promise<ScheduleBookmark> {
    const subscribe = await this.scheduleBookmarkRepository.findOne({
      where: {
        user: userId,
        schedule: scheduleId,
      },
      relations: [ "user", "schedule" ],
    });
    return subscribe;
  }
}
