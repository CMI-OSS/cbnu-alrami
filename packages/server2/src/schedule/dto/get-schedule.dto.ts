import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetScheduleDto {
  @IsOptional()
  @ApiProperty({
    description: "일정 시작일",
    type: Date,
    default: "2022-04-01",
    nullable: true,
    required: false,
  })
  startDateTime?: Date;

  @IsOptional()
  @ApiProperty({
    description: "일정 종료일",
    type: Date,
    default: "2022-06-30",
    nullable: true,
    required: false,
  })
  endDateTime?: Date;
}
