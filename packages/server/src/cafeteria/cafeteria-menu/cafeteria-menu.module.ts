import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CafeteriaModule } from "src/cafeteria/cafeteria.module";

import { CafeteriaMenuController } from "./cafeteria-menu.controller";
import { CafeteriaMenuService } from "./cafeteria-menu.service";
import { CafeteriaMenuRepository } from "./repository/cafeteriaMenu.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([ CafeteriaMenuRepository ]), forwardRef(()=>CafeteriaModule) ],
  controllers: [ CafeteriaMenuController ],
  providers: [ CafeteriaMenuService ],
})
export class CafeteriaMenuModule {}
