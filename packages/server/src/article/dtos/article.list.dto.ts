import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ArticleListDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}
