import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Article } from "src/commons/entities/article.entity";
import { Hit } from "src/commons/entities/hit.entity";
import { User } from "src/commons/entities/user.entity";

import { HitRepository } from "./hit.repository";

@Injectable()
export class HitService {
  constructor(private readonly hitRepository: HitRepository) {}

  async create(user: User, article: Article) {
    if (
      (await this.hitRepository.existsByUserAndArticle(user.id, article.id)) > 0
    )
      return;

    await this.hitRepository.save(
      Builder(Hit).article(article).user(user).build(),
    );
  }
}
