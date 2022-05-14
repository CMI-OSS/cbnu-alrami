import { Entity, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity()
export class Bookmark extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  user: number;

  @ManyToOne(() => Article, (Article) => Article.id, {
    cascade: true,
    nullable: false,
  })
  article: number;
}
