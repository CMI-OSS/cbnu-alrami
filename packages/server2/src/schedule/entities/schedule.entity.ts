import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CommonEntity } from "src/common/entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Schedule extends CommonEntity {
  @ApiProperty({
    description: "일정 내용",
    example: "중간고사",
  })
  @IsString()
  @Column({ type: "varchar" })
  content: string;

  @ApiProperty({
    description: "우선순위",
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Column({ type: "int", nullable: true })
  priority?: number;

  @ApiProperty({
    description: "휴일여부",
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Column({ type: "boolean", nullable: true })
  isHoliday?: boolean;

  @ApiProperty({
    description:
      "타겟의 시작일 기준 시작범위 (query.startDateTime <= target.startDateTime)",
    default: "2023-04-01",
  })
  @IsDateString()
  @Column({ type: "datetime" })
  startDateTime: Date;

  @ApiProperty({
    description:
      "타겟의 시작일 기준 끝범위 (target.startDateTime <= query.endDateTime)",
    default: "2023-05-01",
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Column({ type: "datetime", nullable: true })
  endDateTime?: Date;

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: "schedule_bookmark",
  })
  bookmarkUsers: User[];
}
