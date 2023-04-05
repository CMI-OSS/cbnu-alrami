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
import { DuplicatedResponseDto } from "./dto/duplicate.dto";
import {
  ArticleMutationResponseDto,
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
      type: ArticleMutationResponseDto,
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

export const IsDuplicated = () => {
  return applyDecorators(
    ApiOperation({
      summary: "게시물 중복 여부",
    }),
    ApiOkResponse({ type: () => DuplicatedResponseDto }),
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
    ApiOkResponse({ type: ArticleMutationResponseDto }),
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

export const LikeArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "공지사항 좋아요 추가",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
    UserGuard(),
  );
};

export const UndoLikeArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "공지사항 좋아요 취소",
    }),
    ApiOkResponse({ type: MutationResponse }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
    UserGuard(),
  );
};

export const GetPopularArticle = () => {
  return applyDecorators(
    ApiOperation({
      summary: "인기 공지사항 조회 API",
      description:
        "조회수와 공지사항 등록일을 이용, 최근 2주 동안 제일 인기가 많은순으로 정렬하여 제공",
    }),
    ApiOkResponse({ type: ResponseArticlePageDto }),
    ApiNotFoundResponse({ type: NotFoundArticleException }),
  );
};
