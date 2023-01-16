import { NotFoundException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const EXCEPTION_MESSAGE = {
  NOT_FOUND_BOARD: "게시판을 찾을 수 없습니다.",
  NOT_FOUND_PARENT_BOARD: "부모 게시판을 찾을 수 없습니다.",
} as const;

export class NotFoundBoardException extends NotFoundException {
  constructor() {
    super(EXCEPTION_MESSAGE.NOT_FOUND_BOARD);
  }

  @ApiProperty({ default: EXCEPTION_MESSAGE.NOT_FOUND_BOARD })
  message: string;
}

export class NotFoundParentBoardException extends NotFoundException {
  constructor() {
    super(EXCEPTION_MESSAGE.NOT_FOUND_PARENT_BOARD);
  }

  @ApiProperty({ default: EXCEPTION_MESSAGE.NOT_FOUND_PARENT_BOARD })
  message: string;
}
