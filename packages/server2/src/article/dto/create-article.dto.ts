import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

import articleSwagger from "../article.swagger";

export class CreateArticleDto {
  @ApiProperty(articleSwagger.title)
  @IsString()
  title: string;

  @ApiProperty(articleSwagger.content)
  @IsString()
  content: string;

  @ApiProperty(articleSwagger.url)
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty(articleSwagger.dateTime)
  @IsDateString()
  dateTime: Date;

  @ApiProperty(articleSwagger.boardId)
  @IsNumber()
  boardId: number;
}
