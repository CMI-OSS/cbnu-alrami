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

  private static getImageId(insertResult: InsertResult[]): string[] {
    return insertResult.map((image) => {
      return image.raw.insertId;
    });
  }

  public async uploadImagesToS3(
    images: Express.Multer.File[],
  ): Promise<UploadImageResponse[]> {
    const urls = await this.uploadImages(images);

    const insertResult = await this.saveImage(urls);

    const imageIds = AwsService.getImageId(insertResult);

    return this.getResult(urls, imageIds);
  }

  async s3DeleteImages(deleteFiles: string[]): Promise<void> {
    try {
      const deleteParams = {
        Bucket: this.bucketName,
        Delete: { Objects: [] },
      };

      deleteFiles.forEach((file) => {
        const Key = file.split("com/")[1];
        deleteParams.Delete.Objects.push({ Key });
      });

      if (deleteParams.Delete.Objects.length > 0) {
        await this.awsS3.deleteObjects(deleteParams).promise();
      }
    } catch (error) {
      throw new BadRequestException("S3 파일 삭제에 실패했습니다.");
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

          const result = await this.awsS3
            .upload({
              Bucket: this.bucketName,
              Key: key,
              Body: buffer,
              ACL: "public-read",
              ContentType: mimetype,
            })
            .promise();

          return result.Location;
        }),
      );
    } catch (error) {
      throw new BadRequestException("이미지 업로드에 실패했습니다.");
    }
  }

  private async saveImage(urls: string[]): Promise<InsertResult[]> {
    try {
      return Promise.all(
        urls.map((url) => {
          return this.imageRepository.insert({ url });
        }),
      );
    } catch (error) {
      throw new BadRequestException("이미지 저장에 실패했습니다.");
    }
  }

  private getResult(urls, imageIds): UploadImageResponse[] {
    return urls.reduce((acc, cur, idx) => {
      return [ ...acc, { id: imageIds[idx], url: cur } ];
    }, []);
  }
}
