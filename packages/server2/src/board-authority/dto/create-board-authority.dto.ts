import { IsEnum, IsNumber } from "class-validator";

import { BoardAuthorityType } from "../board-authority.constant";

export class CreateBoardAuthorityDto {
  @IsNumber()
  adminId: number;

  @IsNumber()
  boardId: number;

  @IsEnum(BoardAuthorityType)
  authority: BoardAuthorityType;
}
