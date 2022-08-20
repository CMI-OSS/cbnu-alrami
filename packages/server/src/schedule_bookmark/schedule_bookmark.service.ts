import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ScheduleBookmark } from "src/commons/entities/scheduleBookmark.entity";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";
import { ScheduleService } from "src/schedule/schedule.service";

import { Schedule } from "../commons/entities/schedule.entity";
import { ScheduleBookmarkRepository } from "./schedule_bookmark.repository";

const { ALREADY_SUBSCRIBE_BOOKMARK, NOT_SUBSCRIBED_BOARD } = Errors;

@Injectable()
export class ScheduleBookmarkService {
  constructor(
    private readonly scheduleBookmarkRepository: ScheduleBookmarkRepository,
    private readonly scheduleService: ScheduleService,
  ) {}

  async create(user: User, scheduleId: number) {
    const schedule = await this.scheduleService.findById(scheduleId);
    // DESCRIBE: 요청한 유저가 schedule을 이미 구독 중인지 확인
    if (
      await this.scheduleBookmarkRepository.existsByUserAndSchedule(
        user.id,
        scheduleId,
      )
    )
      throw ALREADY_SUBSCRIBE_BOOKMARK;

    const scheduleBookmark = Builder(ScheduleBookmark)
      .schedule(schedule)
      .user(user)
      .build();
    await this.scheduleBookmarkRepository.save(scheduleBookmark);
    return "success";
  }

  async remove(user: User, scheduleId: number) {
    // DESCRIBE: 요청한 유저가 schedule을 구독하고 있는지 확인
    const subscribe = await this.findByUserAndSchedule(user.id, scheduleId);
    if (!subscribe) throw NOT_SUBSCRIBED_BOARD;

    // DESCRIBE: 이미 구독 중인 schedule을 구독 해제
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

  async find(user: User): Promise<Schedule[]> {
    const schedules = await this.scheduleBookmarkRepository.find({
      where: { user },
      relations: [ "schedule" ],
    });

    return schedules.map((el) => el.schedule);
  }
}
