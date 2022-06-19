import { BoardTreeResponseDto } from "src/boardTree/dto/boardTree.response.dto";

export class ArticleResponseDto {
    id!: number;
    board!: BoardTreeResponseDto;
    title!: string;
    content!: string;
    hits!: number;
    scraps!: number;
    dates!: Date;
    createdAt!: Date;
    updatedAt!: Date;
}