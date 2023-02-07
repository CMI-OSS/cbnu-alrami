import { applyDecorators } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";
import { UserGuard } from "src/user/user.gurad";

import {
  DuplicatedArticleException,
  NotFoundArticleException,
} from "./article.exception";
import {
  ResponseArticleDetailDto,
  ResponseArticlePageDto,
} from "./dto/response-article.dto";

export const CreateArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시물 생성",
    }),
    ApiCreatedResponse({
      description: "게시물이 정상적으로 작성된 경우",
      type: MutationResponse,
    }),
    ApiConflictResponse({ type: DuplicatedArticleException }),
  );
};

export const GetArtice = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시물 조회",
    }),
    ApiOkResponse({ type: () => ResponseArticleDetailDto }),
    ApiNotFoundResponse({
      type: NotFoundArticleException,
    }),
  );
};

export const GetBookmarkArtice = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크한 게시물 조회",
    }),
    ApiOkResponse({ type: () => ResponseArticlePageDto }),
    ApiNotFoundResponse({
      type: NotFoundArticleException,
    }),
  );
};

export const GetSubscribeArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "구독한 게시판중 최신 게시물순 조회",
    }),
    ApiOkResponse({ type: () => ResponseArticlePageDto }),
    ApiNotFoundResponse({
      type: NotFoundArticleException,
    }),
  );
};

export const UpdateArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시물 수정",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
  );
};

export const DeleteArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시물 삭제",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
  );
};

export const BookmarkArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크 설정",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
    UserGuard(),
  );
};

export const UnBookmarkArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "북마크 해제",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
    UserGuard(),
  );
};
