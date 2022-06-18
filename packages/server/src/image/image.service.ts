import { Injectable } from "@nestjs/common";

import { AwsService } from "./aws.service";

@Injectable()
export class ImageService {
  constructor(private readonly awsService: AwsService) {}

  async uploadImagesToS3(images) {
    return this.awsService.uploadImagesToS3(images);
  }
}
