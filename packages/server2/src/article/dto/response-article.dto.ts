import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";

import { Article } from "../entities/article.entity";

export class ResponseArticleDto extends OmitType(Article, [
  "author",
  "content",
]) {
  @ApiProperty({ description: "북마크 수", example: false })
  bookmarkCount: number;

  @ApiProperty({ description: "조회수", example: 1 })
  viewCount: number;
}

export class ResponseArticleDetailDto extends IntersectionType(
  Article,
  ResponseArticleDto,
) {
  @ApiProperty({ description: "북마크 여부", example: false })
  isBookmark: boolean;

  @ApiProperty({ description: "조회 여부", example: 1 })
  isView: boolean;
}
