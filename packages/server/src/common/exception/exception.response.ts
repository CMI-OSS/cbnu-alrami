import { HttpException, HttpStatus } from "@nestjs/common";
import { Error } from "./exception.global";

// 잘못된 요청 exception. Http Status code 400
export class BadRequestException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}

// 인증 실패 exception. Http Status code 401
export class UnauthorizedException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.UNAUTHORIZED);
  }
}

// 인가 실패 exception. Http Status code 403
export class ForbiddenException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.FORBIDDEN);
  }
}

// 리소스 확인 불가 exception. Http Status code 404
export class NotFoundException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.NOT_FOUND);
  }
}

// 허용되지 않은 메소드 exception. Http Status code 405
export class MethodNotAllowedException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.METHOD_NOT_ALLOWED);
  }
}

// 허용되지 않음 exception. Http Status code 406
export class NotAcceptableException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.NOT_ACCEPTABLE);
  }
}

// 요청 시간 초과 exception. Http Status code 408
export class RequestTimeOutException extends HttpException {
  public error: Error;

  constructor(error: Error) {
    super(error, HttpStatus.REQUEST_TIMEOUT);
  }
}
