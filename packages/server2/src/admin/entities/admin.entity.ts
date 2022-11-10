import { BoardAuthority } from "src/board-authority/entities/board-authority.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, OneToMany } from "typeorm";

import { AdminAuthorityType } from "../admin.constant";

@Entity()
export class Admin extends UpdatableCommonEntity {
  @Column("varchar", { length: 20, unique: true })
  loginId: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { length: 20 })
  nickname: string;

  @Column({
    type: "enum",
    enum: AdminAuthorityType,
    default: AdminAuthorityType.Guest,
  })
  authoirty: AdminAuthorityType;

  @OneToMany(() => BoardAuthority, (boardAuthority) => boardAuthority.admin)
  boards: BoardAuthority[];
}
