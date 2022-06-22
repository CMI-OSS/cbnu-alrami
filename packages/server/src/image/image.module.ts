import { Module } from "@nestjs/common";

import { AwsService } from "./aws.service";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
  providers: [ ImageService, AwsService ],
  controllers: [ ImageController ],
})
export class ImageModule {}
