import { ConflictException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const EXCEPTION_MESSAGE = {
  DUPLICATED_ARTICLE: "이미 존재하는 게시물입니다.",
} as const;

export class DuplicatedArticleException extends ConflictException {
  constructor() {
    super(EXCEPTION_MESSAGE.DUPLICATED_ARTICLE);
  }

  @ApiProperty({ default: EXCEPTION_MESSAGE.DUPLICATED_ARTICLE })
  message: string;
}
