import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageModule } from "src/image/image.module";
import { SchoolModule } from "src/school/school.module";

import { Place } from "./entities/place.entity";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ Place ]), ImageModule, SchoolModule ],
  controllers: [ PlaceController ],
  providers: [ PlaceService ],
  exports: [ PlaceService ],
})
export class PlaceModule {}
