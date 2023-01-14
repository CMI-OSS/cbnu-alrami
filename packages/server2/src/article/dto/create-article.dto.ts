import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateImageDto } from "src/image/dto/create-image.dto";

import { ArticleProperty } from "../article.swagger";

export class ArticleDto {
  @ArticleProperty.title()
  @IsString()
  title: string;

  @ArticleProperty.content()
  @IsString()
  content: string;

  @ArticleProperty.url()
  @IsString()
  @IsOptional()
  url?: string;

  @ArticleProperty.dateTime()
  @IsDateString()
  dateTime: Date;

  @ApiProperty({ description: "게시물이 속한 게시판의 ID", example: 1 })
  @IsNumber()
  boardId: number;
}

export class CreateArticleDto extends IntersectionType(
  ArticleDto,
  CreateImageDto,
) {}
