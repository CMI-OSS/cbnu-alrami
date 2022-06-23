import { forwardRef, Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CafeteriaMenuModule } from "src/cafeteria/cafeteria-menu/cafeteria-menu.module";

import { CafeteriaService } from "./cafeteria.service";
import { CafeteriaRepository } from "./repository/cafeteria.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ CafeteriaRepository ]),
    CafeteriaMenuModule,
    RouterModule.register([
      {
        path: "menus",
        module: CafeteriaMenuModule,
      },
    ]),
    forwardRef(() => CafeteriaMenuModule),
  ],
  providers: [ CafeteriaService ],
  exports: [ CafeteriaService ],
})
export class CafeteriaModule {}
