import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubscribeRepository } from "./subscribe.repository";
import { SubscribeService } from "./subscribe.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ SubscribeRepository ]) ],
  providers: [ SubscribeService ],
})
export class SubscribeModule {}
