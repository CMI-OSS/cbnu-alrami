import { Injectable } from "@nestjs/common";
import { Article } from "src/commons/entities/article.entity";
import { Image } from "src/commons/entities/image.entity";
import { Errors } from "src/commons/exception/exception.global";

import { ArticleImageRepository } from "./articleImage.repository";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ArticleImageService {
  constructor(
    private readonly articleImageRepository: ArticleImageRepository,
  ) {}

  // async findByImage(image: Image): Promise<ArticleImage> {
  //   const articleImage = await this.articleImageRepository.findOne({
  //     where: {
  //       image,
  //     },
  //     relations: [ "article", "image" ],
  //   });
  //   if (!articleImage) throw NO_DATA_IN_DB;
  //   return articleImage;
  // }

  async updateArticle(image: Image, article: Article) {
    // const articleImage = await this.findByImage(image);
    await this.articleImageRepository.update(image.id, { article });
  }
}
