import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("subscribe")
export class Subscribe extends CommonEntity {
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
      return Board;
    },
    (Board) => {
      return Board.id;
    },
    {
      cascade: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn()
  board: Board;

  @Column({ type: "bool", width: 1, nullable: true })
  notice: boolean;

  async updateNoticeAbled() {
    this.notice = true;
  }

  async updateNoticeDisabled() {
    this.notice = false;
  }
}
