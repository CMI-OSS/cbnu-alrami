import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class ArticleUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "소속 공지사항 사이트 id (pk)" })
  boardId!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "작성자 id (pk)" })
  adminId!: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "공지사항 제목" })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "공지사항 내용" })
  content!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "공지사항 url" })
  url!: string;

  @IsNotEmpty()
  @ApiProperty({ description: "공지사항 등록 날짜 : YYYY-MM-DD" })
  date!: Date;
}
