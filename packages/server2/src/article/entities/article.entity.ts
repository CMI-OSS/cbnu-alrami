import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Image } from "src/image/entities/image.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class Article extends UpdatableCommonEntity {
  @ApiProperty({
    description: "게시물 제목",
    example: " 2022학년도 동계 글로벌프론티어 단기연수 참가 선발 안내",
  })
  @Column({ type: "varchar" })
  title: string;

  @ApiProperty({
    description: "게시물 내용(html)",
    example:
      "<div>2022학년도 동계 글로벌프론티어 단기연수 참가자를 다음과 같이 안내드립니다.</div>",
  })
  content: string;

  @ApiProperty({
    description: "스크래핑한 공지사항의 실제 URL",
    example: "https://software.cbnu.ac.kr/sub0401/13664",
    required: false,
  })
  @Column({ type: "varchar", nullable: true })
  url?: string;

  @ApiProperty({
    description: "공지사항이 작성된 시간",
    example: new Date(),
  })
  @Column({ type: "datetime" })
  dateTime: Date;

  @ApiProperty({ description: "게시물이 속한 게시판", type: () => Board })
  @ManyToOne(() => Board, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  board?: Board;

  @ApiProperty({ description: "게시물 작성자", type: () => Admin })
  @ManyToOne(() => Admin, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  author?: Admin;

  @OneToMany(() => Image, (image) => image.article, {
    nullable: true,
    cascade: true,
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  images?: Image[];

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: "article_bookmark",
  })
  bookmarkUsers: User[];

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: "article_view",
  })
  viewUsers: User[];
}
