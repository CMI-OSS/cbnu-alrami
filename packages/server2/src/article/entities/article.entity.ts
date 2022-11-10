import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import articleSwagger from "../article.swagger";

@Entity()
export class Article extends UpdatableCommonEntity {
  @ApiProperty(articleSwagger.title)
  @Column({ type: "varchar" })
  title: string;

  @ApiProperty(articleSwagger.content)
  @Column({ type: "mediumtext" })
  content: string;

  @ApiProperty(articleSwagger.url)
  @Column({ type: "varchar", nullable: true })
  url?: string;

  @ApiProperty(articleSwagger.dateTime)
  @Column({ type: "datetime" })
  dateTime: Date;

  @ApiProperty(articleSwagger.board)
  @ManyToOne(() => Board, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  board?: Board;

  @ApiProperty(articleSwagger.author)
  @ManyToOne(() => Admin, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  author?: Admin;
}
