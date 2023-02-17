import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ArticleLike } from "./entities/article-like.entity";

@Injectable()
export class ArticleLikeService {
  constructor(
    @InjectRepository(ArticleLike)
    private articleLikeRepository: Repository<ArticleLike>,
  ) {}
}
