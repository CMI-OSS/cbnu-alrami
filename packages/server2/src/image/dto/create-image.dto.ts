import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";

export class CreateImageDto {
  @ApiProperty({ description: "이미지", example: [ 1 ] })
  @IsArray()
  @IsOptional()
  imageIds?: number[];
}
