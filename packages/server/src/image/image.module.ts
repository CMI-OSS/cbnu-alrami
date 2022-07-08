import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AwsService } from "./aws.service";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { ImageService } from "./image.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ ImageRepository ]) ],
  providers: [ ImageService, AwsService ],
  controllers: [ ImageController ],
})
export class ImageModule {}
