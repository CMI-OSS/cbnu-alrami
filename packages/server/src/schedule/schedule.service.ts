import { Injectable } from "@nestjs/common";

import { Schedule } from "../commons/entities/schedule.entity";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";
import { ScheduleRepository } from "./schedule.repository";

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  public getSchedules(
    getSchedulesRequestDto: GetSchedulesRequestDto,
  ): Promise<Schedule[]> {
    const { startDate, endDate } = getSchedulesRequestDto;

    if (!endDate) {
      return this.scheduleRepository.getDailySchedules(startDate);
    }
    return this.scheduleRepository.getSchedules(getSchedulesRequestDto);
  }
}
