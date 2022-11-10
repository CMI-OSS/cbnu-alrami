import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUrl } from "class-validator";

export class CreateBoardDto {
  @ApiProperty({ description: "게시판 제목" })
  @IsString()
  name: string;

  @ApiProperty({ description: "게시판 URL" })
  @IsUrl()
  url?: string;

  @ApiProperty({ description: "상위 게시판 ID", nullable: true })
  @IsNumber()
  parentBoardId?: number;
}
