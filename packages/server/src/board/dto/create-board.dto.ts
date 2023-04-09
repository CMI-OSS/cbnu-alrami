import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { UpdatableCommonEntityKeys } from "src/common/entity";

import { Board } from "../entities/board.entity";

export class CreateBoardDto extends OmitType(Board, [
  ...UpdatableCommonEntityKeys,
  "children",
  "parent",
]) {
  @ApiProperty({ description: "게시판 ID" })
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ description: "상위 게시판 ID", nullable: true })
  @IsOptional()
  @IsNumber()
  parentBoardId?: number;
}
