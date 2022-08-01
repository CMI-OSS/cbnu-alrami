import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";
import { ImageResponseDto } from "src/image/dto/image.response.dto";

export class ArticleBaseDto {
  id: number;
  title: string;
  hits: number;
  scraps: number;
}

export class ArticleDto {
  id!: number;
  board!: BoardTreeResponseDto;
  title!: string;
  content!: string;
  dates!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ArticleDetailInfoDto extends ArticleBaseDto {
  board: BoardTreeResponseDto;
  dates: Date;
}

export class ArticleListInfoDto extends ArticleBaseDto {
  boardName!: string;
  date!: string;
}

export class ArticleResponseDto extends ArticleDetailInfoDto {
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;
  images!: ImageResponseDto[];
}
