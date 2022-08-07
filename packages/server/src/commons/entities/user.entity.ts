import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

export enum Device {
  IOS = "ios",
  ANDROID = "android",
}

@Entity("user")
export class User extends CommonEntity {
  @Column("uuid", { unique: true, nullable: false })
  uuid: string;

  @Column("varchar", { unique: true, nullable: true })
  fcmToken: string;

  @Column("enum", { enum: Device, nullable: false })
  device: Device;
}
