import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity()
export class Schedule extends CommonEntity {
  @ApiProperty({ description: "학사 내용" })
  @Column({ type: "varchar", length: 50, unique: true })
  content: string;

  @ApiProperty({ description: "우선 순위", required: false })
  @Column({ type: "int", nullable: true })
  priority?: number;

  @ApiProperty({ description: "공휴일 여부", required: false })
  @Column({ type: "tinyint", nullable: true })
  isHoliday?: number;

  @ApiProperty({ description: "일정 시작일" })
  @Column({ type: "date" })
  startDate: Date;

  @ApiProperty({ description: "일정 종료일", required: false })
  @Column({ type: "date", nullable: true })
  endDate?: Date;
}
