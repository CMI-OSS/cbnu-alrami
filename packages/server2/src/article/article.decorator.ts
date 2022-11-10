import { applyDecorators, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse } from "@nestjs/swagger";

import { DuplicatedArticleException } from "./article.exception";
import { Article } from "./entities/article.entity";

export function CreateArticle() {
  return applyDecorators(
    Post(),
    ApiCreatedResponse({
      description: "게시물이 정상적으로 작성된 경우",
      type: Article,
    }),
    ApiConflictResponse({ type: DuplicatedArticleException }),
  );
}
