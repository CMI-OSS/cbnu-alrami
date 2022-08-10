import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column, Entity } from "typeorm";

import { CommonEntity } from "./common.entity";

@Entity("scheduleBookmark")
export class ScheduleBookmark extends CommonEntity {
  @ApiProperty({ description: "유저 아이디" })
  @IsNotEmpty()
  @IsString()
  @Column({ type: "varchar", length: 50 })
  user_id: string;

  @ApiProperty({ description: "스케줄 아이디", required: false })
  @IsOptional()
  @IsNumber()
  @Column({ type: "int", nullable: true })
  schedule_id: number;

  @ApiProperty({ description: "만들어진 날" })
  @IsNotEmpty()
  @IsString()
  @Column({ type: "date" })
  createdAt: Date;
}
