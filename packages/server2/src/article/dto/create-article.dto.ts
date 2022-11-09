import { IsDateString, IsOptional, IsString } from "class-validator";

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
}
