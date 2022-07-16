import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleImageRepository } from "./articleImage.repository";
import { ArticleImageService } from "./articleImage.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ ArticleImageRepository ]) ],
  providers: [ ArticleImageService ],
})
export class ArticleImageModule {}
