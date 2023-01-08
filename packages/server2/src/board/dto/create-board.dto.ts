import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

import { BoardProperty } from "../board.swagger";

export class CreateBoardDto {
  @BoardProperty.name()
  @IsString()
  name: string;

  @BoardProperty.url()
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ description: "상위 게시판 ID", nullable: true })
  @IsOptional()
  @IsNumber()
  parentBoardId?: number;
}
