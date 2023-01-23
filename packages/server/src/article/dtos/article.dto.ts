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
  date!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ArticleDetailInfoDto extends ArticleBaseDto {
  board: BoardTreeResponseDto;
  date: Date;
  updatedAt!: Date;
}

export class ArticleListInfoDto extends ArticleBaseDto {
  boardName!: string;
  date!: Date;
}

export class ArticleResponseDto extends ArticleDetailInfoDto {
  updatedAt!: Date;
  content!: string;
  url!: string;
  isBookmark: boolean;
  images: ImageResponseDto[];
}

export class ArticleDuplicationResponseDto {
  isDuplication: boolean;
}
