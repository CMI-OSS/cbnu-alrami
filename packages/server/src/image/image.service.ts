import { Injectable } from "@nestjs/common";
import { Article } from "src/commons/entities/article.entity";
import { Errors } from "src/commons/exception/exception.global";
import { createQueryBuilder } from "typeorm";

import { Image } from "../commons/entities/image.entity";
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
      relations: [ "article" ],
    });
    if (!image) throw NO_DATA_IN_DB;
    return image;
  }

  async updateArticle(id: number, newArticle: Article) {
    const image = await this.findById(id);
    await this.imageRepository.update(id, { article: newArticle });
    // return createQueryBuilder().update(image).set({
    //   article: articleId,
    // });
  }
}
