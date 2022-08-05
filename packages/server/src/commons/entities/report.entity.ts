import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("report")
export class Report extends CommonEntity {
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

  @Column({ type: "varchar" })
  content: string;

  @Column({ type: "tinyint", default: 0 })
  resolve: number;

  @Column({ type: "varchar", nullable: true })
  comment: string;
}
