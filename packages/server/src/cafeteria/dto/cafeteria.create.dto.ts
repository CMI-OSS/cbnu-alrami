import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { MealTime } from "../../commons/constants/enums";

export class CafeteriaCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "cafeteria 메뉴" })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "date uri" })
  date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "아침, 점심, 저녁 중 1" })
  time: MealTime;
}
