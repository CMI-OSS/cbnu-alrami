import { forwardRef, Module } from "@nestjs/common";
import { BoardModule } from "src/board/board.module";

import { UserModule } from "../user/user.module";
import { FcmService } from "./fcm.service";

@Module({
  imports: [ forwardRef(() => BoardModule), forwardRef(() => UserModule) ],
  providers: [ FcmService ],
  exports: [ FcmService ],
})
export class FcmModule {}
