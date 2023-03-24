import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { UpdatableCommonEntity } from "src/common/entity";
import { Column, Entity } from "typeorm";

import { Device } from "../user.constant";

@Entity()
export class User extends UpdatableCommonEntity {
  @Column({ type: "varchar", unique: true })
  @ApiProperty({ description: "사용자 uuid", example: "1111" })
  uuid: string;

  @Column({ type: "varchar", nullable: true })
  @ApiProperty({ description: "FCN TOKEN", example: "abcd1234" })
  fcmToken?: string;

  @IsEnum(Device)
  @Column({ type: "enum", enum: Device, nullable: true })
  @ApiProperty({ description: "devios 정보", example: "IOS", required: false })
  device?: Device;
}
