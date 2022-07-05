import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "schedule" })
export class Schedule {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "PK" })
  id: number;

  @ApiProperty({ description: "학사 내용" })
  @Column({ type: "varchar", length: 50 })
  content: string;

  @ApiProperty({ description: "우선 순위", required: false })
  @Column({ type: "int", nullable: true })
  priority?: number;

  @ApiProperty({ description: "공휴일 여부", required: false })
  @Column({ type: "boolean", nullable: true })
  isHoliday?: number;

  @ApiProperty({ description: "일정 시작일" })
  @Column({ type: "date" })
  startDate: Date;

  @ApiProperty({ description: "일정 종료일", required: false })
  @Column({ type: "date", nullable: true })
  endDate?: Date;
}
