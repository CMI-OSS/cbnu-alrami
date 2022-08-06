import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BookmarkRepository } from "../bookmark/bookmark.repository";
import { HitRepository } from "../hit/hit.repository";
import { SubscribeRepository } from "../subscribe/subscribe.repository";
import { UserRepository } from "../user/repository/user.repository";
import { FcmService } from "./fcm.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscribeRepository,
      UserRepository,
      BookmarkRepository,
      HitRepository,
    ]),
  ],
  providers: [ FcmService ],
  exports: [ FcmService ],
})
export class FcmModule {}
