import { IsEnum } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BoardAuthorityRole } from "../constants/enums";
import { Admin } from "./admin.entity";
import { Board } from "./board.entity";
import { CommonEntity } from "./common.entity";

@Entity("board_authority")
export class BoardAuthority extends CommonEntity {
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

  @ManyToOne(
    () => {
      return Admin;
    },
    (Admin) => {
      return Admin.id;
    },
    {
      cascade: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn()
  admin: Admin;

  @Column({
    type: "enum",
    enum: BoardAuthorityRole,
    default: BoardAuthorityRole.READ,
  })
  @IsEnum(BoardAuthorityRole)
  role: BoardAuthorityRole;
}
