import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("subscribe")
export class Subscribe extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Board, (Board) => Board.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  board: Board;

  @Column({ type: "bool", width: 1, nullable: true })
  notice: boolean;
}
