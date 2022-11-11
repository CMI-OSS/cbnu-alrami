import { ApiProperty } from "@nestjs/swagger";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("materialized-path")
export class Board extends UpdatableCommonEntity {
  @ApiProperty({ description: "보드의 제목" })
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  url?: string;

  @TreeParent()
  parent?: Board;

  @TreeChildren()
  children?: Board[];
}
