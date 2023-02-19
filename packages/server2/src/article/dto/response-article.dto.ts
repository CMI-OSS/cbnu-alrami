import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { PaginationResponseDto } from "src/common/dto/pagination.dto";
import { MutationResponse } from "src/common/types/response";

import { Article } from "../entities/article.entity";

export class ResponseArticleDto extends OmitType(Article, [
  "author",
  "content",
]) {
  @ApiProperty({ description: "북마크 수", example: 1 })
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

  @ApiProperty({ description: "조회 여부", example: false })
  isView: boolean;

  @ApiProperty({ description: "좋아요 여부", example: false })
  isLike: boolean;
}

export class ResponseArticlePageDto {
  @ApiProperty({ description: "페이지네이션 관련 정보" })
  pagination: PaginationResponseDto;

  @ApiProperty({
    description: "게시물 목록",
    type: ResponseArticleDto,
    isArray: true,
  })
  articles: ResponseArticleDto[];
}

export class ArticleMutationResponseDto extends MutationResponse {
  @ApiProperty({
    description: "게시물 아이디",
    type: Number,
    required: false,
  })
  articleId?: number;
}
