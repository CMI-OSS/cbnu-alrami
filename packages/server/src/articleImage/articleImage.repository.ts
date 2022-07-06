import { ArticleImage } from "src/commons/entities/articleImage.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ArticleImage)
export class ArticleImageRepository extends Repository<ArticleImage> {}
