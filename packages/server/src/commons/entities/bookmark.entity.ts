import { Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity({ name: "bookmark" })
export class Bookmark extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Article, (Article) => Article.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  article: Article;
}
