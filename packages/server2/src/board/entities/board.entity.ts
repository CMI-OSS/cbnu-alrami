import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, Tree, TreeChildren, TreeParent } from "typeorm";

import { BoardProperty } from "../board.swagger";

@Entity()
@Tree("materialized-path")
export class Board extends UpdatableCommonEntity {
  @BoardProperty.name()
  @Column({ type: "varchar", length: 100 })
  name: string;

  @BoardProperty.url()
  @Column({ type: "varchar", length: 255, nullable: true })
  url?: string;

  @BoardProperty.parent()
  @TreeParent()
  parent?: Board;

  @BoardProperty.children()
  @TreeChildren()
  children?: Board[];
}
