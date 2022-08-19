import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { MealTime } from "../../commons/constants/enums";

export class CafeteriaCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: "메뉴", description: "학생식당 메뉴" })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: "2022-08-08", description: "날짜" })
  date: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 1, description: "아침(1), 점심(2), 저녁(3)" })
  time: MealTime;
}
