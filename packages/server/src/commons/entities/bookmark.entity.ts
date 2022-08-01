import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { UpdatableCommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("bookmark")
export class Bookmark extends UpdatableCommonEntity {
  @ManyToOne(() => User, (User) => User.id, {
    cascade: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Article, (Article) => Article.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  article: Article;
}
