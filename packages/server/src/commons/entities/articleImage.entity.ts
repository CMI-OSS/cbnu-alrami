import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";
import { Image } from "./image.entity";

@Entity("article_image")
export class ArticleImage extends CommonEntity {
  @ManyToOne(
    () => {
      return Article;
    },
    (Article) => {
      return Article.id;
    },
    { onDelete: "CASCADE" },
  )
  @JoinColumn()
  article: Article;

  @ManyToOne(
    () => {
      return Image;
    },
    (Image) => {
      return Image.id;
    },
  )
  @JoinColumn()
  image: Image;
}
