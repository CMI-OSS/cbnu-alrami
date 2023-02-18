import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { UpdatableCommonEntityKeys } from "src/common/entity";
import { CreateImageDto } from "src/image/dto/create-image.dto";

import { Article } from "../entities/article.entity";

export class ArticleDto extends OmitType(Article, [
  ...UpdatableCommonEntityKeys,
  "author",
  "board",
  "images",
  "bookmarkCount",
  "likeCount",
  "viewCount",
]) {
  @ApiProperty({ description: "게시물이 속한 게시판의 ID", example: 1 })
  @IsNumber()
  boardId: number;
}

export class CreateArticleDto extends IntersectionType(
  ArticleDto,
  CreateImageDto,
) {}
