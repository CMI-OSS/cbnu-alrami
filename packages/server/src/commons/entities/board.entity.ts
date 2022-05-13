import { ApiProperty } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { BoardTree } from "./boardTree.entity";

@Entity({ name: "board" })
export class Board {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "pk" })
  id!: number;

  @ApiProperty({ description: "board 이름" })
  @Column({ type: "varchar", length: 100, unique: true })
  name!: string;

  @ApiProperty({ description: "board url" })
  @Column({ type: "varchar", length: 255, unique: true })
  url!: string;
}
