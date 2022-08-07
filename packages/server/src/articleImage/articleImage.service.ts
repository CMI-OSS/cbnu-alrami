import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { Article } from "src/commons/entities/article.entity";
import { ArticleImage } from "src/commons/entities/articleImage.entity";
import { Image } from "src/commons/entities/image.entity";
import { Errors } from "src/commons/exception/exception.global";
import { ImageService } from "src/image/image.service";

import { ArticleImageRepository } from "./articleImage.repository";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ArticleImageService {
  constructor(
    private readonly articleImageRepository: ArticleImageRepository,
    private readonly imageService: ImageService,
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

  async removeByImage(imageId: number) {
    await this.articleImageRepository.deleteByImage(imageId);
  }

  async findImageByArticle(articleId: number): Promise<ArticleImage[]> {
    const articleImages = await this.articleImageRepository.find({
      where: {
        article: articleId,
      },
      relations: [ "article", "image" ],
    });
    return articleImages;
  }

  async findImageIdByArticle(articleId: number): Promise<number[]> {
    const articleImages =
      await this.articleImageRepository.findImageIdByArticle(articleId);
    const result = articleImages.map(({ imageId }) => {
      return imageId;
    });
    return result;
  }

  async update(newImages: number[], article: Article) {
    // DESCRIBE: article_image 수정
    const beforeImages = await this.findImageIdByArticle(article.id);

    // DESCRIBE: 기존 이미지 차집합은 삭제
    const beforeDiff = beforeImages.filter((x) => {
      return !newImages.includes(x);
    });
    const removes = beforeDiff.map(async (imageId) => {
      await this.removeByImage(imageId);
    });
    await Promise.all(removes);

    // DESCRIBE: 신규 이미지 차집합은 새로 등록
    const newDiff = newImages.filter((x) => {
      return !beforeImages.includes(x);
    });
    const updates = newDiff.map(async (imageId) => {
      const image = await this.imageService.findById(imageId);
      await this.create(image, article);
    });
    await Promise.all(updates);
  }
}
