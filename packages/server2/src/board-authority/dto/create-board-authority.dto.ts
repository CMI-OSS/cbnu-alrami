import { IsEnum, IsNumber } from "class-validator";

import { BoardAuthorityType } from "../board-authority.constant";
import { BoardAuthorityProperty } from "../board-authority.swagger";

export class CreateBoardAuthorityDto {
  @BoardAuthorityProperty.board()
  @IsNumber()
  boardId: number;

  @BoardAuthorityProperty.authority()
  @IsEnum(BoardAuthorityType)
  authority: BoardAuthorityType;
}
