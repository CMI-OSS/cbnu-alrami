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

  async bookmark(id: number, user: User) {
    const schdule = await this.scheduleRepository.findOne({
      where: { id },
      relations: { bookmarkUsers: true },
    });

    if (!schdule) throw new NotFoundException("찾을 수 없는 학사일정입니다.");

    schdule.bookmarkUsers = schdule.bookmarkUsers
      ? [ user, ...schdule.bookmarkUsers ]
      : [ user ];

    return schdule.save();
  }

  async unbookmark(id: number, user: User) {
    const schdule = await this.scheduleRepository.findOne({
      where: {
        id,
        bookmarkUsers: {
          id: user.id,
        },
      },
      relations: { bookmarkUsers: true },
    });

    if (!schdule) throw new NotFoundException("찾을 수 없는 학사일정입니다.");

    schdule.bookmarkUsers = schdule.bookmarkUsers.filter(
      (_user) => _user.id !== user.id,
    );

    return schdule.save();
  }
}
