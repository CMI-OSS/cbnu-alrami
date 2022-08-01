import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity("board")
export class Board extends CommonEntity {
  @ApiProperty({ description: "board 이름" })
  @Column({ type: "varchar", length: 100, unique: false })
  name!: string;

  @ApiProperty({ description: "board url" })
  @Column({ type: "varchar", length: 255, unique: false })
  url!: string;
}
