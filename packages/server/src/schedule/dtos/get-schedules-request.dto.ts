import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetSchedulesRequestDto {
  @IsNotEmpty()
  @ApiProperty({ description: "일정 시작일" })
  startDate: Date;

  @ApiProperty({ description: "일정 종료일", required: false })
  endDate?: Date;
}
