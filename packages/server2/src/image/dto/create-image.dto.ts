import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";

export class CreateImageDto {
  @ApiProperty({
    type: "number",
    isArray: true,
    description: "이미지",
    example: [ 1 ],
    required: false,
  })
  @IsArray()
  @IsOptional()
  imageIds?: number[];
}
