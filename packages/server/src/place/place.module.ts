import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArticleImageRepository } from "../articleImage/articleImage.repository";
import { AwsService } from "../image/aws.service";
import { ImageRepository } from "../image/image.repository";
import { ImageService } from "../image/image.service";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { PlaceImageRepository } from "./repository/place.image.repository";
import { PlaceRepository } from "./repository/place.repository";
import { SchoolRepository } from "./repository/school.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlaceRepository,
      SchoolRepository,
      PlaceImageRepository,
      ImageRepository,
      ArticleImageRepository,
    ]),
  ],
  controllers: [ PlaceController ],
  providers: [ PlaceService, ImageService, AwsService ],
})
export class PlaceModule {}
