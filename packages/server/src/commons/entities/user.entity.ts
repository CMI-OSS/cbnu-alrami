import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity()
export class User extends CommonEntity {
  @Column("uuid", { unique: true })
  uuid: string;

  @Column("varchar", { unique: true })
  fcmToken: string;
}
