import { EntityRepository, InsertResult, Repository } from "typeorm";

import { Schedule } from "../commons/entities/schedule.entity";
import { GetSchedulesRequestDto } from "./dtos/get-schedules-request.dto";

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async getSchedules(
    getSchedulesRequestDto: GetSchedulesRequestDto,
  ): Promise<Schedule[]> {
    const { startDate, endDate } = getSchedulesRequestDto;
    return this.createQueryBuilder()
      .where("start_date >= :startDate AND start_date <= :endDate", {
        startDate,
        endDate,
      })
      .orWhere("end_date >= :startDate AND end_date <= :endDate", {
        startDate,
        endDate,
      })
      .orderBy("start_date", "ASC")
      .getMany();
  }

  async getDailySchedules(startDate: Date): Promise<Schedule[]> {
    return this.createQueryBuilder()
      .where("Start_date <= :startDate AND end_date >= :startDate", {
        startDate,
      })
      .orderBy("priority", "ASC")
      .addOrderBy("start_date", "ASC")
      .getMany();
  }

  async saveHoliday(content: string, startDate: Date): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Schedule)
      .values({
        content: `${content}`,
        isHoliday: true,
        startDate: `${startDate}`,
      })
      .execute();
  }
}
