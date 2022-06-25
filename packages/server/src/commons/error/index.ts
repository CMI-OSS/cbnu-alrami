import {
  BadRequestException,
  ConflictException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

export const errors = {
  ADMIN_NOT_FOUND: new NotFoundException("찾을 수 없는 관리자 계정입니다."),
  USER_NOT_FOUND: new NotFoundException("찾을 수 없는 사용자입니다."),
  LOGIN_INFO_NOT_FOUND: new NotFoundException(
    "일치하는 로그인 정보가 없습니다.",
  ),
  CAFETERIA_NOT_FOUND: new NotFoundException("식당이 없습니다."),
  PLACE_NOT_FOUND: new NotFoundException("등록되지 않은 장소입니다."),
  MENU_NOT_FOUND: new NotFoundException("메뉴가 없습니다."),
  AUTHORITY_REQUIRED: new UnauthorizedException("권한이 없습니다."),
  TOKEN_REQUIRED: new UnauthorizedException("토큰이 필요합니다."),
  LOGIN_REQUIRED: new UnauthorizedException("로그인이 필요합니다."),
  TOKEN_EXPIRED: new UnauthorizedException("토큰이 만료되었습니다."),
  LOGIN_ID_REQUIRED: new BadRequestException("아이디를 입력해주세요."),
  PASSWORD_REQUIRED: new BadRequestException("비밀번호를 입력해주세요."),
  NICKNAME_REQUIRED: new BadRequestException("닉네임을 입력해주세요."),
  LOGIN_ID_DUPLICATED: new ConflictException("중복된 ID입니다."),
  NICKNAME_DUPLICATED: new ConflictException("중복된 닉네임입니다."),
  DB_ERROR: new NotAcceptableException("DB등록에 실패했습니다."),
};
