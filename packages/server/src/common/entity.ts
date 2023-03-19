import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class CommonEntity extends BaseEntity {
  @ApiProperty({ description: "아이디", example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: "생성 시간" })
  @CreateDateColumn({
    type: "timestamp",
  })
  createdDateTime: Date;
}

export abstract class UpdatableCommonEntity extends CommonEntity {
  @ApiProperty({ description: "수정 시간" })
  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedDateTime: Date;
}

const BaseEntityKeys = [
  "hasId",
  "save",
  "remove",
  "softRemove",
  "recover",
  "reload",
] as const;

export const CommonEntityKeys = [
  "id",
  "createdDateTime",
  ...BaseEntityKeys,
] as const;

export const UpdatableCommonEntityKeys = [
  ...CommonEntityKeys,
  "updatedDateTime",
] as const;
