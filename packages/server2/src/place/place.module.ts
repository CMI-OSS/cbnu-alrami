import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Place } from "./entities/place.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ Place ]) ],
})
export class PlaceModule {}
