import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { CommonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BoardAuthorityType } from "../board-authority.constant";
import { BoardAuthorityProperty } from "../board-authority.swagger";

@Entity()
export class BoardAuthority extends CommonEntity {
  @ManyToOne(() => Admin, (admin) => admin.authoirty, { onDelete: "CASCADE" })
  @JoinColumn()
  admin: Admin;

  @ApiProperty({ type: Board, description: "게시판" })
  @ManyToOne(() => Board, { onDelete: "CASCADE" })
  @JoinColumn()
  board: Board;

  @BoardAuthorityProperty.authority()
  @Column({
    type: "enum",
    enum: BoardAuthorityType,
  })
  authority: BoardAuthorityType;
}
