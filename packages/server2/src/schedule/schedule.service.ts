import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { GetScheduleDto } from "./dto/get-schedule.dto";
import { Schedule } from "./entities/schedule.entity";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createArticleDto: CreateScheduleDto) {
    return this.scheduleRepository.save({ ...createArticleDto });
  }

  findAll({ startDateTime, endDateTime }: GetScheduleDto) {
    const where = startDateTime && {
      ...(startDateTime && { startDateTime: MoreThanOrEqual(startDateTime) }),
      ...(endDateTime && { endDateTime: LessThanOrEqual(startDateTime) }),
      ...(endDateTime && { endDateTime: LessThanOrEqual(endDateTime) }),
    };

    if (where) return this.scheduleRepository.find({ where });

    return this.scheduleRepository.find();
  }

  async findBookmarkSchedules(user: User) {
    const schedules: Schedule[] = await this.scheduleRepository.find({
      where: {
        bookmarkUsers: {
          id: user.id,
        },
      },
    });

    return schedules;
  }

  async bookmark(id: number, user: User) {
    const Schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: { bookmarkUsers: true },
    });

    if (!Schedule) throw new NotFoundException("찾을 수 없는 학사일정입니다.");

    Schedule.bookmarkUsers = Schedule.bookmarkUsers
      ? [ user, ...Schedule.bookmarkUsers ]
      : [ user ];

    return Schedule.save();
  }

  async unbookmark(id: number, user: User) {
    const Schedule = await this.scheduleRepository.findOne({
      where: {
        id,
        bookmarkUsers: {
          id: user.id,
        },
      },
      relations: { bookmarkUsers: true },
    });

    if (!Schedule) throw new NotFoundException("찾을 수 없는 학사일정입니다.");

    Schedule.bookmarkUsers = Schedule.bookmarkUsers.filter(
      (_user) => _user.id !== user.id,
    );

    return Schedule.save();
  }
}
