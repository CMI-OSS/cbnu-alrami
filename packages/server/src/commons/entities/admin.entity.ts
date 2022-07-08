import * as bcrypt from "bcrypt";
import { Authority } from "src/commons/constants/enums";
import { BeforeInsert, Column, Entity } from "typeorm";

import { UpdatableCommonEntity } from "./common.entity";

@Entity("admin")
export class Admin extends UpdatableCommonEntity {
  @Column("varchar", { length: 20, unique: true, nullable: false })
  loginId: string;

  @Column("varchar", { nullable: false })
  password: string;

  @Column("varchar", { length: 20, unique: true, nullable: false })
  nickname: string;

  @Column({
    type: "enum",
    enum: Authority,
    default: Authority.Guest,
    nullable: false,
  })
  authority: Authority;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
