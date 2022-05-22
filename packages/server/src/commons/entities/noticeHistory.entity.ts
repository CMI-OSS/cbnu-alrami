import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Article } from "./article.entity";
import { CommonEntity } from "./common.entity";
import { User } from "./user.entity";

@Entity("notice_history")
export class NoticeHistory extends CommonEntity {
  @ManyToOne(() => User, (User) => User.id, { cascade: true, nullable: false })
  @JoinColumn({ name: "user_id" })
  userId: User;

  @ManyToOne(() => Article, (Article) => Article.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "article_id" })
  articleId: Article;

  @Column({ type: "boolean", default: false })
  isConfirm: boolean;
}
