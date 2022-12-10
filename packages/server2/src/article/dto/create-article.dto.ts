import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

import { ArticleProperty } from "../article.swagger";

export class CreateArticleDto {
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
