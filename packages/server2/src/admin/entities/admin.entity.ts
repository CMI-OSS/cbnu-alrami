import { BoardAuthority } from "src/board-authority/entities/board-authority.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity, OneToMany } from "typeorm";

import { AdminAuthorityType } from "../admin.constant";
import { AdminProperty } from "../admin.swagger";

@Entity()
export class Admin extends UpdatableCommonEntity {
  @AdminProperty.loginId()
  @Column("varchar", { length: 20, unique: true })
  loginId: string;

  @AdminProperty.password()
  @Column("varchar")
  password: string;

  @AdminProperty.nickname()
  @Column("varchar", { length: 20 })
  nickname: string;

  @AdminProperty.authoirty()
  @Column({
    type: "enum",
    enum: AdminAuthorityType,
    default: AdminAuthorityType.Guest,
  })
  authoirty: AdminAuthorityType;

  @AdminProperty.boards()
  @OneToMany(() => BoardAuthority, (boardAuthority) => boardAuthority.admin)
  boards: BoardAuthority[];
}
