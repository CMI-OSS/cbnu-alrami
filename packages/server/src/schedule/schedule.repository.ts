import { EntityRepository, Repository } from "typeorm";

import { Schedule } from "../commons/entities/schedule.entity";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async getSchedules(
    getSchedulesRequestDto: GetSchedulesRequestDto,
  ): Promise<Schedule[]> {
    const { startDate, endDate } = getSchedulesRequestDto;
    return this.createQueryBuilder()
      .where("startDate >= :startDate AND startDate <= :endDate", {
        startDate,
        endDate,
      })
      .orWhere("endDate >= :startDate AND endDate <= :endDate", {
        startDate,
        endDate,
      })
      .orderBy("startDate", "ASC")
      .getMany();
  }

  async getDailySchedules(startDate: Date): Promise<Schedule[]> {
    return this.createQueryBuilder()
      .where("StartDate <= :startDate AND endDate >= :startDate", { startDate })
      .orderBy("priority", "ASC")
      .addOrderBy("startDate", "ASC")
      .getMany();
  }

  async saveHoliday(content, startDate) {
    return this.createQueryBuilder()
      .insert()
      .into(Schedule)
      .values({
        content: `${content}`,
        isHoliday: 1,
        startDate: `${startDate}`,
      })
      .execute();
  }
}
