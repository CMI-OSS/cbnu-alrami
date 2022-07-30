import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Article } from "src/commons/entities/article.entity";
import { ArticleImage } from "src/commons/entities/articleImage.entity";
import { Image } from "src/commons/entities/image.entity";
import { Errors } from "src/commons/exception/exception.global";

import { ArticleImageRepository } from "./articleImage.repository";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ArticleImageService {
  constructor(
    private readonly articleImageRepository: ArticleImageRepository,
  ) {}

  async create(image: Image, article: Article) {
    const articleImage = Builder(ArticleImage)
      .article(article)
      .image(image)
      .build();

    await this.articleImageRepository.save(articleImage);
  }

  async remove(id: number) {
    await this.articleImageRepository.delete({ id });
  }

  async findImageByArticle(articleId: number): Promise<number[]> {
    const articleImages =
      await this.articleImageRepository.findImageIdByArticle(articleId);
    const result = articleImages.map(({ articleId }) => articleId);
    return result;
  }
}
