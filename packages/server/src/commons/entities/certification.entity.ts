import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity("certification")
export class Certification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn({ name: "user_id" })
  userId: number;

  @Column({ type: "varchar" })
  number: string;

  @Column({ type: "datetime" })
  expireDate: Date;
}
