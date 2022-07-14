import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubscribeControlelr } from "./subscribe.controller";
import { SubscribeRepository } from "./subscribe.repository";
import { SubscribeService } from "./subscribe.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ SubscribeRepository ]) ],
  controllers: [ SubscribeControlelr ],
  providers: [ SubscribeService ],
})
export class SubscribeModule {}
