import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @ApiProperty({
    description: "페이지",
    required: false,
    default: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @ApiProperty({
    description: "아이템 개수",
    required: false,
    default: 10,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  count = 10;
}
