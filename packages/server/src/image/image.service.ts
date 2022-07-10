import { Injectable } from "@nestjs/common";

import { AwsService } from "./aws.service";
import { UploadImageResponse } from "./dto/upload-image.response.dto";

@Injectable()
export class ImageService {
  constructor(private readonly awsService: AwsService) {}

  async uploadImages(
    images: Express.Multer.File[],
  ): Promise<UploadImageResponse> {
    return this.awsService.uploadImagesToS3(images);
  }
}
