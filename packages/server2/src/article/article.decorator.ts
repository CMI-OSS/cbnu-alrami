import { applyDecorators, Delete, Get, Patch, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { MutationResponse } from "src/common/types/response";

import { DuplicatedArticleException } from "./article.exception";
import { Article } from "./entities/article.entity";

export function CreateArticle() {
  return applyDecorators(
    Post(),
    ApiOperation({
      summary: "게시물 생성",
    }),
    ApiCreatedResponse({
      description: "게시물이 정상적으로 작성된 경우",
      type: Article,
    }),
    ApiConflictResponse({ type: DuplicatedArticleException }),
  );
}

export function GetArtice() {
  return applyDecorators(
    Get(":id"),
    ApiOperation({
      summary: "게시물 조회",
    }),
    ApiOkResponse({ type: Article }),
  );
}

export function UpdateArticle() {
  return applyDecorators(
    Patch(":id"),
    ApiOperation({
      summary: "게시물 수정",
    }),
    ApiOkResponse({ type: MutationResponse }),
  );
}

export function DeleteArticle() {
  return applyDecorators(
    Delete(":id"),
    ApiOperation({
      summary: "게시물 삭제",
    }),
    ApiOkResponse({ type: MutationResponse }),
  );
}
