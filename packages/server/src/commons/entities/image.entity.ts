import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";

@Entity({ name: "image" })
export class Image extends CommonEntity() {
  @ManyToOne(() => Article, (Article) => Article.id, { nullable: true })
  @JoinColumn()
  article?: Article;

  @Column({ type: "varchar" })
  url: string;
}
