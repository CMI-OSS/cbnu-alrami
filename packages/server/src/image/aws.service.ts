import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";

@Injectable()
export class AwsService {
  private readonly bucketName;
  private readonly awsS3: S3;

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new S3(this.configService.get("awsS3"));
    this.bucketName = this.configService.get("s3BucketName");
  }

  public async uploadImagesToS3(
    images: Express.Multer.File[],
  ): Promise<string[]> {
    try {
      const imageUrls = await this.uploadImages(images);

      return imageUrls.map((url) => {
        return this.getAwsS3ImageUrl(url);
      });
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

  private getAwsS3ImageUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
