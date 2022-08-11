import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleImageModule } from "src/articleImage/articleImage.module";
import { ImageModule } from "src/image/image.module";

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
    ]),
    ImageModule,
    ArticleImageModule,
  ],
  controllers: [ PlaceController ],
  providers: [ PlaceService ],
})
export class PlaceModule {}
