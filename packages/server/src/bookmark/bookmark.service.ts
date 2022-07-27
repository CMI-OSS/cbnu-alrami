import { Injectable } from "@nestjs/common";
import { ArticleService } from "src/article/article.service";
import { User } from "src/commons/entities/user.entity";
import { Errors } from "src/commons/exception/exception.global";

import { BookmarkRepository } from "./bookmark.repository";

const { ALREADY_SUBSCRIBE_BOOKMARK } = Errors;

@Injectable()
export class BookmarkService {
  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly articleService: ArticleService,
  ) {}

  async create(user: User, articleId: number) {
    const article = await this.articleService.findById(articleId);

    // DESCRIBE: 요청한 유저가 article을 이미 구독 중인지 확인
    if (
      await this.bookmarkRepository.existsByUserAndArticle(user.id, articleId)
    )
      throw ALREADY_SUBSCRIBE_BOOKMARK;

    await this.bookmarkRepository.save(article);
    return "success";
  }
}
