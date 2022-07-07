import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { firstValueFrom } from "rxjs";

import { Schedule } from "../commons/entities/schedule.entity";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";
import { ScheduleRepository } from "./schedule.repository";

interface holidayData {
  dateKind: "01";
  dateName?: string | undefined;
  isHoliday: "Y";
  locdate?: Date | undefined;
  seq: 1;
}

@Injectable()
export class ScheduleService {
  private readonly holidayKey;
  private readonly holidayUrl;

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.holidayKey = this.configService.get("holiday.key");
    this.holidayUrl = this.configService.get("holiday.url");
  }

  private static getYear(): number {
    const today = new Date();
    return today.getFullYear();
  }

  public getSchedules(
    getSchedulesRequestDto: GetSchedulesRequestDto,
  ): Promise<Schedule[]> {
    const { startDate, endDate } = getSchedulesRequestDto;

    if (!endDate) {
      return this.scheduleRepository.getDailySchedules(startDate);
    }
    return this.scheduleRepository.getSchedules(getSchedulesRequestDto);
  }

  @Cron(CronExpression.EVERY_YEAR)
  public async getHolidays(): Promise<void> {
    const url = `${this.holidayUrl}`;

    const serviceKey = `?ServiceKey=${this.holidayKey}`;

    const year = ScheduleService.getYear();
    const solYear = `&solYear=${year}`;

    const holiday = await firstValueFrom(
      this.httpService.get(`${url}${serviceKey}${solYear}&numOfRows=30`),
    );

    const holidayData: holidayData[] = holiday.data.response.body.items.item;

    holidayData.map(async (holiday) => {
      const { dateName, locdate } = holiday;

      await this.scheduleRepository.saveHoliday(dateName, locdate);
    });
  }
}
