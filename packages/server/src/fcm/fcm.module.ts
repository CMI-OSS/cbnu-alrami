import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HitModule } from "src/hit/hit.module";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";

import { BookmarkRepository } from "../bookmark/bookmark.repository";
import { UserRepository } from "../user/repository/user.repository";
import { FcmService } from "./fcm.service";

@Module({
  imports: [
    HitModule,
    TypeOrmModule.forFeature([
      UserRepository,
      BookmarkRepository,
      SubscribeRepository,
    ]),
  ],
  providers: [ FcmService ],
  exports: [ FcmService ],
})
export class FcmModule {}
