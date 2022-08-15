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
  @ApiProperty({ description: "학사 내용", default: "중간고사" })
  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 50 })
  content: string;

  @ApiProperty({ description: "우선 순위", required: false, default: "1" })
  @IsOptional()
  @IsNumber()
  @Column({ type: "int", nullable: true })
  priority?: number;

  @ApiProperty({
    description: "공휴일 여부",
    required: false,
    default: "false",
  })
  @IsOptional()
  @IsBoolean()
  @Column({ type: "boolean", nullable: true })
  isHoliday?: boolean;

  @ApiProperty({ description: "일정 시작일", default: "2022-04-20" })
  @IsNotEmpty()
  @IsString()
  @Column({ type: "date" })
  startDate: Date;

  @ApiProperty({
    description: "일정 종료일",
    required: false,
    default: "2022-05-01",
  })
  @IsOptional()
  @IsString()
  @Column({ type: "date", nullable: true })
  endDate?: Date;
}
