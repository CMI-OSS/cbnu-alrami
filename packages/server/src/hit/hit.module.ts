import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HitRepository } from "./hit.repository";
import { HitService } from "./hit.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ HitRepository ]) ],
  providers: [ HitService ],
  exports: [ HitService ],
})
export class HitModule {}
