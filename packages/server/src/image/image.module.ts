import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleImageRepository } from "../articleImage/articleImage.repository";
import { PlaceImageRepository } from "../place/repository/place.image.repository";
import { AwsService } from "./aws.service";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ImageRepository,
      ArticleImageRepository,
      PlaceImageRepository,
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [ ImageService, AwsService ],
  controllers: [ ImageController ],
  exports: [ ImageService, AwsService ],
})
export class ImageModule {}
