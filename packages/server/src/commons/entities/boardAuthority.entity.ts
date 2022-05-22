import { IsEnum } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BoardAuthorityRole } from "../constants/enums";
import { Admin } from "./admin.entity";
import { Board } from "./board.entity";

@Entity("board_authority")
export class BoardAuthority {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (Board) => Board.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "board_id" })
  boardId: Board;

  @ManyToOne(() => Admin, (Admin) => Admin.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "admin_id" })
  adminId: Admin;

  @Column({
    type: "enum",
    enum: BoardAuthorityRole,
    default: BoardAuthorityRole.READ,
  })
  @IsEnum(BoardAuthorityRole)
  role: BoardAuthorityRole;
}
