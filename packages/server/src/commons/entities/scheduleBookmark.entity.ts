import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { Schedule } from "./schedule.entity";
import { User } from "./user.entity";

@Entity("schedule_bookmark")
export class ScheduleBookmark extends CommonEntity {
  @ManyToOne(
    () => {
      return User;
    },
    (User) => {
      return User.id;
    },
    {
      cascade: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => {
      return Schedule;
    },
    (Schedule) => {
      return Schedule.id;
    },
    {
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn()
  schedule: Schedule;
}
