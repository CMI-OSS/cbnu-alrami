import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminRepository } from "./repository/admin.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([ AdminRepository ]) ],
  providers: [ AdminService ],
  exports: [ AdminService ],
  controllers: [ AdminController ],
})
export class AdminModule {}
