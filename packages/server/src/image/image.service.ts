import { Injectable } from "@nestjs/common";
import { Image } from "src/commons/entities/image.entity";
import { Errors } from "src/commons/exception/exception.global";

import { AwsService } from "./aws.service";
import { UploadImageResponse } from "./dto/upload-image.response.dto";
import { ImageRepository } from "./image.repository";

const { IMAGE_ID_NOT_FOUND, IMAGE_URL_NOT_FOUND } = Errors;

@Injectable()
export class ImageService {
  constructor(
    private readonly awsService: AwsService,
    private readonly imageRepository: ImageRepository,
  ) {}

  async uploadImages(
    images: Express.Multer.File[],
  ): Promise<UploadImageResponse[]> {
    return this.awsService.uploadImagesToS3(images);
  }

  async findById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: {
        id,
      },
    });
    if (!image) throw IMAGE_ID_NOT_FOUND;
    return image;
  }

  async findByUrl(url: string): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: {
        url,
      },
    });
    if (!image) throw IMAGE_URL_NOT_FOUND;
    return image;
  }
}
