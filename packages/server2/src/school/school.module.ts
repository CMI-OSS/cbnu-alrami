import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { School } from "./entities/school.entity";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ School ]) ],
  controllers: [ SchoolController ],
  providers: [ SchoolService ],
})
export class SchoolModule {}
