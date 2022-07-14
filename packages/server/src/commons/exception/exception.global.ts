import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";

export type Error = {
  message: string;
};

// 예외 메세지 예시
export const Errors = {
  // 공통
  NO_DATA_IN_DB: new NotFoundException(
    "데이터베이스에 값이 존재하지 않습니다.",
  ),

  // board 도메인에 대한 예외 메세지
  BOARD_ID_NOT_FOUND: new NotFoundException(
    "해당 id의 board가 존재하지 않습니다.",
  ),
  DUPLICATE_BOARD_NAME: new BadRequestException(
    "이미 존재하는 board name입니다.",
  ),
  DUPLICATE_BOARD_URL: new BadRequestException(
    "이미 존재하는 board url입니다.",
  ),

  // article 도메인에 대한 예외 메세지
  ARTICLE_URL_EXISTS: new NotFoundException(
    "이미 존재하는 공지사항 url 입니다.",
  ),

  // subscribe 도메인에 대한 예외 메세지
  ALREADY_SUBSCRIBE_BOARD: new ConflictException(
    "이미 구독 중인 board 입니다.",
  ),
};
