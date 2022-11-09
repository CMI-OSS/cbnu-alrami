import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BoardAuthorityCreateDto {
  @IsNotEmpty()
  @ApiProperty({ description: "관리자 ID", default: 1 })
  adminId!: number;

  @IsNotEmpty()
  @ApiProperty({ description: "보드 ID", default: 30101 })
  boardId!: number;
}

export class BoardAuthorityCreateResponseDto {
  @IsNotEmpty()
  @ApiProperty({ description: "성공 여부" })
  success!: boolean;
}
