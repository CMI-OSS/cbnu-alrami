import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";

export class ArticleDetailInfoDto {
  id: number;
  board: BoardTreeResponseDto;
  title: string;
  hits: number;
  scraps: number;
  dates: Date;
}
