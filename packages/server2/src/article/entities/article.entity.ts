import { Admin } from "src/admin/entities/admin.entity";
import { Board } from "src/board/entities/board.entity";
import { UpdatableCommonEntity } from "src/common/entity";
import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { ArticleProperty } from "../article.swagger";

@Entity()
export class Article extends UpdatableCommonEntity {
  @ArticleProperty.title()
  @Column({ type: "varchar" })
  title: string;

  @ArticleProperty.content()
  @Column({ type: "mediumtext" })
  content: string;

  @ArticleProperty.url()
  @Column({ type: "varchar", nullable: true })
  url?: string;

  @ArticleProperty.dateTime()
  @Column({ type: "datetime" })
  dateTime: Date;

  @ArticleProperty.board()
  @ManyToOne(() => Board, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  board?: Board;

  @ArticleProperty.author()
  @ManyToOne(() => Admin, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  author?: Admin;

  @ArticleProperty.images()
  @OneToMany(() => Image, (image) => image.article, { nullable: true })
  images?: Image[];
}
