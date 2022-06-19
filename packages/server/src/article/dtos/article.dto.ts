import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";

export class ArticleDto {
  id!: number;
  board!: BoardTreeResponseDto;
  title!: string;
  content!: string;
  dates!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
