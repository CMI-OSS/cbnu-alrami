import { ConflictException, NotFoundException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const EXCEPTION_MESSAGE = {
  DUPLICATED_LOGIN_ID: "이미 존재하는 아이디입니다.",
  NOT_FOUND_ADMIN: "존재하지 않는 관리자입니다.",
  NOT_FOUND_BOARDS: "존재하지 않는 게시판입니다.",
} as const;

export class DuplicatedLoginIdException extends ConflictException {
  constructor() {
    super(EXCEPTION_MESSAGE.DUPLICATED_LOGIN_ID);
  }

  @ApiProperty({ default: EXCEPTION_MESSAGE.DUPLICATED_LOGIN_ID })
  message: string;
}

export class NotFoundAdminException extends NotFoundException {
  constructor() {
    super(EXCEPTION_MESSAGE.NOT_FOUND_ADMIN);
  }

  @ApiProperty({ default: EXCEPTION_MESSAGE.NOT_FOUND_ADMIN })
  message: string;
}

export class NotFoundBoardsException extends NotFoundException {
  constructor(ids?: number[]) {
    super(`${EXCEPTION_MESSAGE.NOT_FOUND_BOARDS}${JSON.stringify(ids)}`);
  }

  @ApiProperty({ default: EXCEPTION_MESSAGE.NOT_FOUND_BOARDS })
  message: string;
}
