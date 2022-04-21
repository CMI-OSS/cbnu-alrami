import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class AwsService {
  private awsS3;
  private bucketName;

  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new AWS.S3(this.configService.get("awsS3"));
    this.bucketName = this.configService.get("s3BucketName");
  }

  public async uploadImagesToS3(images: Express.Multer.File[]) {
    try {
      const imageUrls = await this.uploadImages(images);

      const location = imageUrls.map((url) => {
        return this.getAwsS3ImageUrl(url);
      });

      return location;
    } catch (error) {
      throw new BadRequestException("이미지 전송에 실패했습니다.");
    }
  }

  public async deleteImageFromS3(
    location: string,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<{ success: true }> {
    const key = location.split(`s3.amazonaws.com/image/`)[1];

    try {
      await this.awsS3
        .deleteObject(
          {
            Bucket: this.bucketName,
            Key: key,
          },
          callback,
        )
        .promise();
      return { success: true };
    } catch (error) {
      throw new BadRequestException("이미지 삭제에 실패했습니다.");
    }
  }

  private async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
    try {
      const uploadImages = images.map((image) => {
        const { mimetype, buffer, fieldname } = image;
        const date = new Date().getTime();
        const extension = mimetype.split("/")[1];
        const key = `${fieldname}/${date}.${extension}`;

        this.awsS3
          .putObject({
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ACL: "public-read",
            ContentType: mimetype,
          })
          .promise();

        return key;
      });

      return uploadImages;
    } catch (error) {
      throw new BadRequestException("이미지 업로드에 실패했습니다.");
    }
  }

  private getAwsS3ImageUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
