import { Authority } from "src/admin/admin.constant";
import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { CommonEntity } from "src/common/entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class BoardAuthority extends CommonEntity {
  @ManyToOne(() => Admin, (admin) => admin.boards)
  admin: Admin;

  @Column({ type: "enum", enum: Authority, default: Authority.Guest })
  authoirty: Authority;

  @JoinColumn()
  board: Board;
}
