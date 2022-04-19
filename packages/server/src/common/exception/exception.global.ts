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
  // A 도메인에 대한 예외 메세지
  EXAMPLE_NOT_FOUND: new NotFoundException("예외처리 예시입니다."),
  TEST_NOT_VALIDATE: new InternalServerErrorException("예외처리 예시입니다22."),

  // B 도메인에 대한 예외 메세지
  NO_DATA_IN_DB: new NotFoundException("예외처리 예시입니다333."),
  SESSION_EXPIRED: new BadRequestException("예외처리 예시입니다4444."),
};
