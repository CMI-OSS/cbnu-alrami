import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CommonEntity } from "src/common/entity";
import { Column, Entity } from "typeorm";

import { ScheduleProperty } from "../schedule.swagger";

@Entity()
export class Schedule extends CommonEntity {
  @ScheduleProperty.content()
  @IsString()
  @Column({ type: "varchar" })
  content: string;

  @ScheduleProperty.priority()
  @IsNumber()
  @Column({ type: "int" })
  priority: number;

  @ScheduleProperty.isHoliday()
  @IsBoolean()
  @Column({ type: "boolean", nullable: true })
  isHoliday?: boolean;

  @ScheduleProperty.startDateTime()
  @IsDateString()
  @Column({ type: "datetime" })
  startDateTime: Date;

  @ScheduleProperty.endDateTime()
  @IsDateString()
  @IsOptional()
  @Column({ type: "datetime", nullable: true })
  endDateTime?: Date;
}
