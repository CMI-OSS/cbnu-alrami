import { ApiProperty, OmitType } from "@nestjs/swagger";

import { Article } from "../entities/article.entity";

export class ResponseArticleDto extends OmitType(Article, [ "author" ]) {
  @ApiProperty({ description: "북마크 여부", example: false })
  isBookmark: boolean;
}
