import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";

@Entity({ name: "image" })
export class Image extends CommonEntity {
  @ManyToOne(() => Article, (Article) => Article.id, { nullable: true })
  @JoinColumn({ name: "article_id" })
  articleId?: number;

  @Column({ type: "varchar" })
  url: string;
}
