import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PlaceRepository } from "./repository/place.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([ PlaceRepository ]) ],
})
export class PlaceModule {}
