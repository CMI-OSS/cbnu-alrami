import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CafeteriaMenuController } from "./cafeteria-menu.controller";
import { CafeteriaMenuService } from "./cafeteria-menu.service";
import { CafeteriaMenu } from "./entities/cafeteria-menu.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ CafeteriaMenu ]) ],
  controllers: [ CafeteriaMenuController ],
  providers: [ CafeteriaMenuService ],
})
export class CafeteriaMenuModule {}
