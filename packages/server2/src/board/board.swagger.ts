import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { ResponseArticleDto } from "src/article/dto/resonse-article.dto";
import { MutationResponse } from "src/common/types/response";

import { NotFoundBoardException } from "./board.exception";
import { Board } from "./entities/board.entity";

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
      type: [ ResponseArticleDto ],
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
