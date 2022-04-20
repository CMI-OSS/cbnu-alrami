import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import { Public } from "../../dist/decorator/public.decorator";
import { AwsService } from "./aws.service";

@Controller()
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Public()
  @Post("uploads/images")
  @UseInterceptors(FilesInterceptor("image", 10))
  async uploadImages(
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<string[]> {
    return this.awsService.uploadImagesToS3("image", images);
  }
}
