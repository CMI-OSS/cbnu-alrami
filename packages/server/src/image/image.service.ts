import { BadRequestException, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Image } from "src/commons/entities/image.entity";
import { Errors } from "src/commons/exception/exception.global";

import { ArticleImageRepository } from "../articleImage/articleImage.repository";
import { AwsService } from "./aws.service";
import { UploadImageResponse } from "./dto/upload-image.response.dto";
import { ImageRepository } from "./image.repository";

const { NO_DATA_IN_DB } = Errors;

@Injectable()
export class ImageService {
  constructor(
    private readonly awsService: AwsService,
    private readonly imageRepository: ImageRepository,
    private readonly articleImageRepository: ArticleImageRepository,
  ) {}

  async uploadImages(
    images: Express.Multer.File[],
  ): Promise<UploadImageResponse[]> {
    return this.awsService.uploadImagesToS3(images);
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async deleteUnusedImages(): Promise<void> {
    const images = await this.imageRepository.find();
    const articleImages = await this.articleImageRepository.find({
      relations: [ "image" ],
    });

    const imageInfo = Object.values(images).map((image) => {
      return { id: image.id, url: image.url };
    });

    const articleImageId = Object.values(articleImages).map((articleImage) => {
      return articleImage.image.id;
    });

    const filteredImageInfo = imageInfo.filter((image) => {
      return !articleImageId.includes(image.id);
    });

    const deleteImages = filteredImageInfo.map((image) => {
      return image.url;
    });

    try {
      filteredImageInfo.forEach((image) => {
        this.imageRepository.delete({ id: image.id });
      });
    } catch (error) {
      throw new BadRequestException("데이터베이스 파일 삭제에 실패했습니다");
    } finally {
      await this.awsService.s3DeleteImages(deleteImages);
    }
  }

  async findById(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ id });
    if (!image) throw NO_DATA_IN_DB;
    return image;
  }
}
