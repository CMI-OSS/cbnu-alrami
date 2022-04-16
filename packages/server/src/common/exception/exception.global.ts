import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
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
  DUPLICATE_BOARD_NAME: new BadRequestException(
    "이미 존재하는 board name입니다.",
  ),
  DUPLICATE_BOARD_URL: new BadRequestException(
    "이미 존재하는 board url입니다.",
  ),
};
