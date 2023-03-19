import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { firstValueFrom } from "rxjs";
import configuration from "src/config/configuration";
import { User } from "src/user/entities/user.entity";
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { GetScheduleDto } from "./dto/get-schedule.dto";
import { Schedule } from "./entities/schedule.entity";

interface holidayData {
  dateKind: "01";
  dateName: string;
  isHoliday: "Y";
  locdate: Date;
  seq: 1;
}

@Injectable()
export class ScheduleService {
  private readonly holidayKey: string;
  private readonly holidayUrl: string;

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private readonly httpService: HttpService,
  ) {
    this.holidayKey = configuration.holiday.key;
    this.holidayUrl = configuration.holiday.url;
  }

  @Cron(CronExpression.EVERY_YEAR)
  public async getHolidays(): Promise<void> {
    const url = `${this.holidayUrl}`;

    const serviceKey = `?ServiceKey=${this.holidayKey}`;

    const year = ScheduleService.getYear();
    const solYear = `&solYear=${year}`;

    const holiday = await firstValueFrom(
      this.httpService.get(`${url}${serviceKey}${solYear}&numOfRows=100`),
    );

    const holidayData: holidayData[] = holiday.data.response.body.items.item;

    await this.saveHoliday(holidayData);
  }

  private async saveHoliday(holidayData: holidayData[]): Promise<void> {
    await Promise.all(
      holidayData.map(async (holiday) => {
        const { dateName, locdate } = holiday;

        return this.scheduleRepository.save({
          content: dateName,
          isHoliday: true,
          startDateTime: locdate,
        });
      }),
    );
  }

  private static getYear(): number {
    const today = new Date();
    return today.getFullYear();
  }

  async create(createArticleDto: CreateScheduleDto) {
    return this.scheduleRepository.save({ ...createArticleDto });
  }

  findAll({ startDateTime, endDateTime }: GetScheduleDto) {
    return this.scheduleRepository.find({
      where: [
        //           <--- target --->
        // <--- query --->
        {
          startDateTime: MoreThanOrEqual(startDateTime),
          ...(endDateTime && {
            startDateTime: Between(startDateTime, endDateTime),
          }),
        },
        // <--- target --->
        //           <--- query --->
        {
          endDateTime: MoreThanOrEqual(startDateTime),
          ...(endDateTime && {
            endDateTime: Between(startDateTime, endDateTime),
          }),
        },
        // <----- target ---->
        //   <--- query --->
        {
          startDateTime: LessThanOrEqual(startDateTime),
          ...(endDateTime && {
            endDateTime: MoreThanOrEqual(endDateTime),
          }),
        },
      ],
      order: {
        startDateTime: "ASC",
      },
    });
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

  async isHoliday(date: string) {
    const holidaySchedule = await this.scheduleRepository.findOneBy({
      startDateTime: date as unknown as Date,
      isHoliday: true,
    });

    return holidaySchedule ?? { isHoliday: false };
  }
}
