import { Module } from "@nestjs/common";
import { BoardModule } from "src/board/board.module";

import { UserModule } from "../user/user.module";
import { FcmService } from "./fcm.service";

@Module({
  imports: [ BoardModule, UserModule ],
  providers: [ FcmService ],
})
export class FcmModule {}
