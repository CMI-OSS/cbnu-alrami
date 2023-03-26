import { ApiProperty } from "@nestjs/swagger";
import { UpdatableCommonEntity } from "src/common/entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";

import { SubscribeBoard } from "./subscribe-board.entity";

@Entity()
@Tree("materialized-path")
export class Board extends UpdatableCommonEntity {
  @ApiProperty({ description: "아이디", example: 1 })
  @PrimaryColumn()
  id!: number;

  @ApiProperty({
    description: "게시판 제목",
    example: "소프트웨어학과",
  })
  @Column({ type: "varchar", length: 100 })
  name: string;

  @ApiProperty({
    description: "게시판 URL",
    example: "https://software.cbnu.ac.kr/sub0401",
    required: false,
  })
  @Column({ type: "varchar", length: 255, nullable: true })
  url?: string;

  @ApiProperty({
    description: "부모 게시판",
    required: false,
    example: {
      url: "https://ece.cbnu.ac.kr/",
      name: "전자정보대학",
    },
  })
  @TreeParent({ onDelete: "CASCADE" })
  parent?: Board;

  @ApiProperty({
    description: "자식 게시판",
    required: false,
    type: () => [ ChildBoard ],
  })
  @TreeChildren()
  children?: Board[];

  @OneToMany(() => SubscribeBoard, (subscribe) => subscribe.board, {
    cascade: true,
    nullable: true,
  })
  subscribes?: SubscribeBoard[];
}

export class ChildBoard extends Board {}
