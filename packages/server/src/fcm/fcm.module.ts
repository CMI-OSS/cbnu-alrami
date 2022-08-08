import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscribeModule } from "src/subscribe/subscribe.module";
import { SubscribeRepository } from "src/subscribe/subscribe.repository";

import { BookmarkRepository } from "../bookmark/bookmark.repository";
import { HitRepository } from "../hit/hit.repository";
import { UserRepository } from "../user/repository/user.repository";
import { FcmService } from "./fcm.service";

@Module({
  imports: [
    SubscribeModule,
    TypeOrmModule.forFeature([
      UserRepository,
      BookmarkRepository,
      HitRepository,
      SubscribeRepository,
    ]),
  ],
  providers: [ FcmService ],
  exports: [ FcmService ],
})
export class FcmModule {}
