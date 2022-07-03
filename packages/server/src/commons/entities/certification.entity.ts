import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Certification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: "varchar" })
  number: string;

  @Column({ type: "datetime" })
  expireDate: Date;
}
