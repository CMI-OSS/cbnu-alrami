import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("subscribe")
export class Subscribe extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn({ name: "user_id" })
  userId: User;

  @ManyToOne(() => Board, (Board) => Board.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "board_id" })
  boardId: Board;

  @Column({ type: "tinyint", nullable: true })
  notice: number;
}
