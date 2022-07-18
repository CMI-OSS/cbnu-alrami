import { Injectable } from "@nestjs/common";

import { BookmarkRepository } from "./bookmark.repository";

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async findByUser(userId: number) {
    const articleList = await this.bookmarkRepository.findByUser(userId);
    return articleList;
  }
}
