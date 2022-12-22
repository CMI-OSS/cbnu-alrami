import { applyDecorators } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from "@nestjs/swagger";
import { BoardAuthority } from "src/board-authority/entities/board-authority.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { MutationResponse } from "src/common/types/response";

import { AdminAuthorityType } from "./admin.constant";
import {
  DuplicatedLoginIdException,
  NotFoundAdminException,
} from "./admin.exception";
import { Admin } from "./entities/admin.entity";

type AdminProperty = Record<
  Exclude<keyof Admin, keyof UpdatableCommonEntity>,
  () => PropertyDecorator
>;

export const AdminProperty: AdminProperty = {
  loginId: () =>
    ApiProperty({
      description: "로그인에 사용할 아이디",
      example: "test",
    }),

  password: () =>
    ApiProperty({
      description: "비밀번호",
      example: "12345678",
    }),
  nickname: () =>
    ApiProperty({
      description: "닉네임",
      example: "testnickname",
    }),
  authoirty: () =>
    ApiProperty({
      description: "권한",
      example: AdminAuthorityType.StudentCouncil,
      enum: AdminAuthorityType,
    }),

  boards: () =>
    ApiProperty({
      description: "권한이 부여된 게시판",
      type: [ BoardAuthority ],
    }),
};

export const CreateAdmin = () => {
  return applyDecorators(
    ApiOperation({
      summary: "관리자 생성",
    }),
    ApiCreatedResponse({
      description: "관리자가 정상적으로 생성된 경우",
      type: Admin,
    }),
    ApiConflictResponse({ type: DuplicatedLoginIdException }),
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
