import { ApiProperty } from "@nestjs/swagger";

export class DuplicatedResponseDto {
  @ApiProperty({ description: "중복 여부" })
  isDuplicated: boolean;
}
