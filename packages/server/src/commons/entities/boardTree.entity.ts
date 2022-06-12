import { ApiProperty } from "@nestjs/swagger";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Board } from "./board.entity";

@Entity({ name: "board_tree" })
export class BoardTree {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "pk" })
  id!: number;

  @OneToOne(() => Board)
  @JoinColumn()
  board: Board;

  @OneToOne(() => Board)
  @JoinColumn()
  parentBoard: Board;
}
