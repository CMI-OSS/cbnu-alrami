import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "src/image/image.module";

import { ArticleImageRepository } from "./articleImage.repository";
import { ArticleImageService } from "./articleImage.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ ArticleImageRepository ]), ImageModule ],
  providers: [ ArticleImageService ],
  exports: [ ArticleImageService ],
})
export class ArticleImageModule {}
