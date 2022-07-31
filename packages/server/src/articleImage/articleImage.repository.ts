import { Article } from "src/commons/entities/article.entity";
import { ArticleImage } from "src/commons/entities/articleImage.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ArticleImage)
export class ArticleImageRepository extends Repository<ArticleImage> {
  async updateArticle(imageId: number, article: Article): Promise<void> {
    await this.createQueryBuilder()
      .update(ArticleImage)
      .set({
        article,
      })
      .where("article_image.image_id = :imageId", { imageId })
      .execute();
  }

  async findImageIdByArticle(articleId: number) {
    return this.createQueryBuilder()
      .select([ "image_id AS imageId" ])
      .where("article_id = :articleId", { articleId })
      .getRawMany();
  }

  async deleteByImage(imageId: number) {
    return this.createQueryBuilder()
      .delete()
      .from(ArticleImage)
      .where("image_id = :imageId", { imageId })
      .execute();
  }
}
