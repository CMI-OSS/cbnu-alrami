import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CreateCafeterias from "src/commons/seeds/cafeteria.seed";
import { PlaceModule } from "src/place/place.module";

import { CafeteriaService } from "./cafeteria.service";
import { CafeteriaRepository } from "./repository/cafeteria.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([ CafeteriaRepository ]), PlaceModule ],
  providers: [ CafeteriaService, CreateCafeterias ],
})
export class CafeteriaModule {}
