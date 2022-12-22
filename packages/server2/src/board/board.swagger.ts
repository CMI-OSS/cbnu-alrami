import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from "@nestjs/swagger";
import { Article } from "src/article/entities/article.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { MutationResponse } from "src/common/types/response";

import { NotFoundBoardException } from "./board.exception";
import { Board } from "./entities/board.entity";

type BoardProperty = Record<
  Exclude<keyof Board, keyof UpdatableCommonEntity>,
  () => PropertyDecorator
>;

export const BoardProperty: BoardProperty = {
  name: () =>
    ApiProperty({
      description: "게시판 제목",
      example: "소프트웨어학과",
    }),
  url: () =>
    ApiProperty({
      description: "게시판 URL",
      example: "https://software.cbnu.ac.kr/sub0401",
      required: false,
    }),
  parent: () =>
    ApiProperty({
      description: "부모 게시판",
      required: false,
      example: {
        url: "https://ece.cbnu.ac.kr/",
        name: "전자정보대학",
      },
    }),
  children: () =>
    ApiProperty({
      description: "자식 게시판",
      required: false,
      example: [],
    }),
};

export const CreateBoard = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시판 생성",
    }),
    ApiCreatedResponse({
      description: "게시판이 정상적으로 작성된 경우",
      type: Board,
    }),
  );
};

export const GetBoard = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시판 조회",
    }),
    ApiOkResponse({
      type: Board,
    }),
  );
};

export const GetBoards = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시판 목록 조회",
    }),
    ApiOkResponse({
      type: [ Board ],
    }),
    ApiNotFoundResponse({ type: NotFoundBoardException }),
  );
};

export const GetArticlePage = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시판내 게시물 페이지 조회",
    }),
    ApiOkResponse({
      type: [ Article ],
    }),
    ApiNotFoundResponse({ type: NotFoundBoardException }),
  );
};

export const UpdateBoard = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시판 수정",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({
      type: NotFoundBoardException,
    }),
  );
};

export const DeleteBoard = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시판 삭제",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundBoardException }),
  );
};
