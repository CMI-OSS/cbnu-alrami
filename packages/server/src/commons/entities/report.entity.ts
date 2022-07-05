import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity()
export class Report extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: "varchar" })
  content: string;

  @Column({ type: "tinyint", default: 0 })
  resolve: number;

  @Column({ type: "varchar", nullable: true })
  comment: string;
}
