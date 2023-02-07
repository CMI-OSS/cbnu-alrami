import { Article } from "src/article/entities/article.entity";
import { CommonEntity } from "src/common/entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity({ name: "article_view" })
export class ArticleView extends CommonEntity {
  @ManyToOne(() => Article, (article) => article.viewUsers)
  article: Article;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
