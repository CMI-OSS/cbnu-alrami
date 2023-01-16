import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
}
