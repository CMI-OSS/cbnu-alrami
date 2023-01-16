import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AwsModule } from "src/aws/aws.module";

import { Image } from "./entities/image.entity";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
  imports: [ TypeOrmModule.forFeature([ Image ]), AwsModule ],
  controllers: [ ImageController ],
  providers: [ ImageService ],
  exports: [ ImageService ],
})
export class ImageModule {}
