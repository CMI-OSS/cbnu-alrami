import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity } from "typeorm";

import { Authority } from "../admin.constant";

@Entity()
export class Admin extends UpdatableCommonEntity {
  @Column("varchar", { length: 20, unique: true })
  loginId: string;

  @Column("varchar")
  password: string;

  @Column("varchar", { length: 20, unique: true })
  nickname: string;

  @Column({ type: "enum", enum: Authority, default: Authority.Guest })
  authoirty: Authority;
}
