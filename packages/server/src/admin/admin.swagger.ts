import { applyDecorators } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Board } from "src/board/entities/board.entity";
import { MutationResponse } from "src/common/types/response";

import {
  DuplicatedLoginIdException,
  NotFoundAdminException,
  NotFoundBoardsException,
} from "./admin.exception";
import { ResponseLoginDto } from "./dto/response-login.dto";
import { Admin } from "./entities/admin.entity";

export const CreateAdmin = () => {
  return applyDecorators(
    ApiOperation({
      summary: "관리자 생성",
    }),
    ApiCreatedResponse({
      description: "관리자가 정상적으로 생성된 경우",
      type: MutationResponse,
    }),
    ApiConflictResponse({ type: DuplicatedLoginIdException }),
    ApiNotFoundResponse({ type: NotFoundBoardsException }),
  );
};

export const GetAdmins = () => {
  return applyDecorators(
    ApiOperation({
      summary: "관리자 목록 조회",
    }),
    ApiOkResponse({ type: [ Admin ] }),
  );
};

export const GetAdmin = () => {
  return applyDecorators(
    ApiOperation({
      summary: "관리자 조회",
    }),
    ApiOkResponse({ type: Admin }),
    ApiNotFoundResponse({
      type: NotFoundAdminException,
    }),
  );
};

export const GetMe = () => {
  return applyDecorators(
    ApiOperation({
      summary: "본인 관리자 조회",
    }),
    ApiOkResponse({ type: Admin }),
    ApiNotFoundResponse({
      type: NotFoundAdminException,
    }),
  );
};

export const GetAuthoriyBoards = () => {
  return applyDecorators(
    ApiOperation({
      summary: "권한이 있는 게시판 조회",
    }),
    ApiOkResponse({ type: Board, isArray: true }),
    ApiNotFoundResponse({
      type: NotFoundAdminException,
    }),
  );
};

export const UpdateAdmin = () => {
  return applyDecorators(
    ApiOperation({
      summary: "관리자 수정",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundAdminException }),
  );
};

export const DeleteAdmin = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시물 삭제",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundAdminException }),
  );
};

export const Login = () => {
  return applyDecorators(
    ApiOperation({
      summary: "로그인",
    }),
    ApiOkResponse({ type: ResponseLoginDto }),
    ApiNotFoundResponse({ type: NotFoundAdminException }),
  );
};
