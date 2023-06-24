import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Image } from "src/image/entities/image.entity";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { ArticleBookmark } from "../../article-bookmark/entities/article-bookmark";
import { ContentTransformer } from "./content.transformer";

@Entity()
export class Article extends UpdatableCommonEntity {
  @ApiProperty({
    description: "게시물 제목",
    example: " 2022학년도 동계 글로벌프론티어 단기연수 참가 선발 안내",
  })
  @IsString()
  @Column({ type: "varchar" })
  title: string;

  @ApiProperty({
    description: "게시물 내용",

    example:
      "<div>2022학년도 동계 글로벌프론티어 단기연수 참가자를 다음과 같이 안내드립니다.</div>",
  })
  @IsString()
  // 문자열 압축을 통해 암/복호화해서 내용을 저장
  @Column({ transformer: new ContentTransformer(), type: "mediumtext" })
  content: string;

  // 내용에서 tag를 제거한 버전 / 나중에 검색용으로 사용하게 될 수 있음
  @Column({ type: "text", select: false, nullable: true })
  contentText?: string;

  @ApiProperty({
    description: "스크래핑한 공지사항의 실제 URL",
    example: "https://software.cbnu.ac.kr/sub0401/13664",
    required: false,
  })
  @IsString()
  @IsOptional()
  @Column({ type: "varchar", nullable: true })
  url?: string;

  @ApiProperty({
    description: "공지사항이 작성된 시간",
    example: new Date(),
  })
  @IsDateString()
  @Column({ type: "datetime" })
  dateTime: Date;

  @ApiProperty({
    type: Number,
    description: "공지사항 조회 수",
    example: 13,
  })
  @IsNumber()
  @Column({ type: "int", default: 0 })
  viewCount = 0;

  @ApiProperty({
    type: Number,
    description: "공지사항 북마크 수",
    example: 203,
  })
  @IsNumber()
  @Column({ type: "int", default: 0 })
  bookmarkCount = 0;

  @ApiProperty({
    type: Number,
    description: "공지사항 좋아요 수",
    example: 1000,
  })
  @IsNumber()
  @Column({ type: "int", default: 0 })
  likeCount = 0;

  @ApiProperty({ description: "게시물이 속한 게시판", type: () => Board })
  @ManyToOne(() => Board, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  board?: Board;

  @ApiProperty({ description: "게시물 작성자", type: () => Admin })
  @ManyToOne(() => Admin, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  author?: Admin;

  @ApiProperty({
    description: "게시물 이미지",
    type: () => Image,
    isArray: true,
    required: false,
  })
  @OneToMany(() => Image, (image) => image.article, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  images?: Image[];

  @OneToMany(() => ArticleBookmark, (bookmark) => bookmark.article, {
    cascade: true,
    nullable: true,
  })
  bookmarkUsers?: ArticleBookmark[];

  @BeforeInsert()
  @BeforeUpdate()
  saveContentText() {
    const removeTags = (html: string): string => {
      const cleanr = /<[^>]*>/g;
      return html
        .replace(cleanr, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ");
    };

    this.contentText = removeTags(this.content);
  }
}
