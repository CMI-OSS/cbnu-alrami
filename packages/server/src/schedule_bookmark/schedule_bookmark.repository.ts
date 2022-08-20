import { ScheduleBookmark } from "src/commons/entities/scheduleBookmark.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ScheduleBookmark)
export class ScheduleBookmarkRepository extends Repository<ScheduleBookmark> {
  async existsByUserAndSchedule(
    userId: number,
    scheduleId: number,
  ): Promise<number> {
    return this.createQueryBuilder("scheduleBookmark")
      .where("scheduleBookmark.user_id = :userId", { userId })
      .andWhere("scheduleBookmark.schedule_id = :scheduleId", { scheduleId })
      .getCount();
  }
}
