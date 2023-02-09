import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ArticleBookmark } from "./entities/article-bookmark";

@Injectable()
export class ArticleBookmarkService {
  constructor(
    @InjectRepository(ArticleBookmark)
    private articleBookmarkRepository: Repository<ArticleBookmark>,
  ) {}
}
