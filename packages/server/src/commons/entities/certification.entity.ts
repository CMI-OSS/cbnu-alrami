import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("certification")
export class Certification extends CommonEntity {
  @OneToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: "varchar" })
  number: string;

  @Column({ type: "datetime" })
  expireDate: Date;
}
