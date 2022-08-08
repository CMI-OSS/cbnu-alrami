import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleImageRepository } from "../articleImage/articleImage.repository";
import { AwsService } from "./aws.service";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ ImageRepository, ArticleImageRepository ]),
    ScheduleModule.forRoot(),
  ],
  providers: [ ImageService, AwsService ],
  controllers: [ ImageController ],
  exports: [ ImageService, AwsService ],
})
export class ImageModule {}
