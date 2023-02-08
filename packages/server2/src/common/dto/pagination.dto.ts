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

export class PaginationResponseDto {
  @ApiProperty({
    description: "현재 페이지",
    example: 1,
    default: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  currentPage = 1;

  @ApiProperty({
    description: "전체 페이지",
    example: 10,
    default: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  totalPageCount = 1;

  @ApiProperty({
    description: "전체 아이템 개수",
    example: 200,
    default: 0,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  totalItemCount = 0;

  @ApiProperty({
    description: "마지막 페이지 여부",
    example: false,
    default: false,
    type: Boolean,
  })
  @IsNumber()
  @Type(() => Boolean)
  isEnd = false;
}
