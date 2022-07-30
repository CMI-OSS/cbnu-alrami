import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";

import { BoardAuthorityRepository } from "./board-authoirty.repository";
import { BoardAuthorityController } from "./board-authority.controller";
import { BoardAuthorityService } from "./board-authority.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ BoardAuthorityRepository ]), AdminModule ],
  providers: [ BoardAuthorityService ],
  controllers: [ BoardAuthorityController ],
})
export class BoardAuthorityModule {}
