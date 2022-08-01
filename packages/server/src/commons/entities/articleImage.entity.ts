import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";
import { Image } from "./image.entity";

@Entity("article_image")
export class ArticleImage extends CommonEntity {
  @ManyToOne(() => Article, (Article) => Article.id, { onDelete: "CASCADE" })
  @JoinColumn()
  article: Article;

  @ManyToOne(() => Image, (Image) => Image.id)
  @JoinColumn()
  image: Image;
}
