import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CafeteriaController } from "./cafeteria.controller";
import { CafeteriaService } from "./cafeteria.service";
import { CafeteriaMenuRepository } from "./repository/cafeteria-menu.repository";
import { CafeteriaRepository } from "./repository/cafeteria.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ CafeteriaRepository, CafeteriaMenuRepository ]),
  ],
  providers: [ CafeteriaService ],
  controllers: [ CafeteriaController ],
  exports: [ CafeteriaService ],
})
export class CafeteriaModule {}
