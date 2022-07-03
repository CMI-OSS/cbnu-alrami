import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ArticleCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  images: number[];
}
