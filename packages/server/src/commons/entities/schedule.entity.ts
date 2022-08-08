import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity("schedule")
export class Schedule extends CommonEntity {
  @ApiProperty({ description: "학사 내용" })
  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 50 })
  content: string;

  @ApiProperty({ description: "우선 순위", required: false })
  @IsOptional()
  @IsNumber()
  @Column({ type: "int", nullable: true })
  priority?: number;

  @ApiProperty({ description: "공휴일 여부", required: false })
  @IsOptional()
  @IsBoolean()
  @Column({ type: "boolean", nullable: true })
  isHoliday?: boolean;

  @ApiProperty({ description: "일정 시작일" })
  @IsNotEmpty()
  @IsString()
  @Column({ type: "date" })
  startDate: Date;

  @ApiProperty({ description: "일정 종료일", required: false })
  @IsOptional()
  @IsString()
  @Column({ type: "date", nullable: true })
  endDate?: Date;
}
