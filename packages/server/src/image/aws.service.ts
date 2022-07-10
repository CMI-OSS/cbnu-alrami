import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { InsertResult } from "typeorm";

import { UploadImageResponse } from "./dto/upload-image.response.dto";
import { ImageRepository } from "./image.repository";

@Injectable()
export class AwsService {
  private readonly bucketName;
  private readonly awsS3: S3;

  constructor(
    private readonly configService: ConfigService,
    private readonly imageRepository: ImageRepository,
  ) {
    this.awsS3 = new S3(this.configService.get("awsS3"));
    this.bucketName = this.configService.get("s3BucketName");
  }

  private static async getImageId(
    insertResult: InsertResult[],
  ): Promise<string[]> {
    return insertResult.map((image) => {
      return image.raw.insertId;
    });
  }

  public async uploadImagesToS3(
    images: Express.Multer.File[],
  ): Promise<UploadImageResponse> {
    try {
      const keys = await this.uploadImages(images);

      const urls = this.getAwsS3ImageUrl(keys);

      const insertResult = await this.saveImage(urls);

      const imageIds = await AwsService.getImageId(insertResult);

      return {
        urls,
        imageIds,
      };
    } catch (error) {
      throw new BadRequestException("이미지 전송에 실패했습니다.");
    }
  }

  private async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
    try {
      return Promise.all(
        images.map(async (image) => {
          const { mimetype, buffer, fieldname } = image;
          const date = new Date().getTime();
          const extension = mimetype.split("/")[1];
          const key = `${fieldname}/${date}.${extension}`;

          await this.awsS3
            .putObject({
              Bucket: this.bucketName,
              Key: key,
              Body: buffer,
              ACL: "public-read",
              ContentType: mimetype,
            })
            .promise();

          return key;
        }),
      );
    } catch (error) {
      throw new BadRequestException("이미지 업로드에 실패했습니다.");
    }
  }

  private getAwsS3ImageUrl(keys: string[]): string[] {
    return keys.map((key) => {
      return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    });
  }

  private async saveImage(urls: string[]): Promise<InsertResult[]> {
    return Promise.all(
      urls.map((url) => {
        return this.imageRepository.insert({ url });
      }),
    );
  }
}
