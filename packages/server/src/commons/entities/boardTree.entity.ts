import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Board } from "./board.entity";

@Entity({ name: "board_tree" })
export class BoardTree {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "pk" })
  id!: number;

  @Column({ name: "board_id" })
  board!: Board;

  @Column({ name: "parent_board_id" })
  parentBoard: Board;
}
