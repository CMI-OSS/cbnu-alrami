import { Module } from "@nestjs/common";

import { BoardAuthorityController } from "./board-authority.controller";
import { BoardAuthorityService } from "./board-authority.service";

@Module({
  controllers: [ BoardAuthorityController ],
  providers: [ BoardAuthorityService ],
})
export class BoardAuthorityModule {}
