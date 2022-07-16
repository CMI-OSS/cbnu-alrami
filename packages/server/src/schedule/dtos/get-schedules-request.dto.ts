import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class GetSchedulesRequestDto {
  @IsNotEmpty()
  @ApiProperty({ description: "일정 시작일", default: "2022-06-01" })
  startDate: Date;

  @IsOptional()
  @ApiProperty({
    description: "일정 종료일",
    required: false,
    default: "2022-06-30",
  })
  endDate?: Date;
}
