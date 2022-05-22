import { Column, Entity, ManyToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("subscribe")
export class Subscribe extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  user: number;

  @ManyToOne(() => Board, (Board) => Board.id, {
    cascade: true,
    nullable: false,
  })
  board: number;

  @Column({ type: "tinyint", nullable: true })
  notice: number;
}
