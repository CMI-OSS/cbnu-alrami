import { Injectable } from "@nestjs/common";
import { Image } from "src/commons/entities/image.entity";
import { Errors } from "src/commons/exception/exception.global";

import { AwsService } from "./aws.service";
import { ImageRepository } from "./image.repository";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ImageService {
  constructor(
    private readonly awsService: AwsService,
    private readonly imageRepository: ImageRepository,
  ) {}

  async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
    return this.awsService.uploadImagesToS3(images);
  }

  async findById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: {
        id,
      },
    });
    if (!image) throw NO_DATA_IN_DB;
    return image;
  }

  image;
}
