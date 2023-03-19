import { CommonEntity } from "src/common/entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

import { Board } from "./board.entity";

@Entity()
@Unique([ "board", "user" ])
export class SubscribeBoard extends CommonEntity {
  @ManyToOne(() => Board, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  board: Board;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ type: "boolean", nullable: true })
  notice?: boolean;
}
