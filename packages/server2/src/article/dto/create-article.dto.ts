import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsDateString()
  dateTime: Date;

  @IsNumber()
  boardId: number;
}
