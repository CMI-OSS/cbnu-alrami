import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ArticleService } from "src/article/article.service";
import { Bookmark } from "src/commons/entities/bookmark.entity";
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

    const bookmark = Builder(Bookmark).article(article).user(user).build();

    await this.bookmarkRepository.save(bookmark);
    return "success";
  }

  async remove(user: User, articleId: number) {
    // DESCRIBE: 요청한 유저가 article을 구독하고 있는지 확인
    const subscribe = await this.findByUserAndArticle(user.id, articleId);
    if (!subscribe) throw ALREADY_SUBSCRIBE_BOOKMARK;

    // DESCRIBE: 이미 구독 중인 board라면 구독 해제
    await this.bookmarkRepository.delete({ id: subscribe.id });
    return "success";
  }

  async findByUserAndArticle(
    userId: number,
    articleId: number,
  ): Promise<Bookmark> {
    const subscribe = await this.bookmarkRepository.findOne({
      where: {
        user: userId,
        article: articleId,
      },
      relations: [ "user", "article" ],
    });
    return subscribe;
  }
}
