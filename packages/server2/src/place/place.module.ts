import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "src/image/image.module";

import { Place } from "./entities/place.entity";
import { PlaceService } from "./place.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ Place ]), ImageModule ],
  providers: [ PlaceService ],
  exports: [ PlaceService ],
})
export class PlaceModule {}
