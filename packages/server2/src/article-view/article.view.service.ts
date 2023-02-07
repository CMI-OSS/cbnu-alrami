import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../../../server/src/commons/entities/user.entity";
import { ArticleView } from "./entities/article-view.entity";

type YYYYMMDD = string;

@Injectable()
export class ArticleViewService {
  constructor(
    @InjectRepository(ArticleView)
    private articleViewRepository: Repository<ArticleView>,
  ) {}

  async view(articleId: number, user: User) {
    if (!this.isView(articleId, user.id)) {
      // article의 ViewCount 증가
      // aritlce_view에 새로운 row 추가
    }
  }

  async isView(articleId: number, userId: number) {
    const viewCount = await this.articleViewRepository.countBy({
      article: { id: articleId },
      user: { id: userId },
    });
    return viewCount > 0;
  }

  // async save(article: Article, user: User) {

  // }
}

// articleId로 조회수 증가 API 호출
// 성공하면 -> article 상세 조회 API 호출
