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

  public async uploadImagesToS3(
    folder: string,
    images: Express.Multer.File[],
  ): Promise<string[]> {
    try {
      const locations = [];

      for (const image of images) {
        const { mimetype, buffer, fieldname } = image;
        const date = new Date().getTime();
        const extension = mimetype.split("/")[1];
        const key = `${folder}/${fieldname}_${date}.${extension}`;

        this.awsS3
          .putObject({
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ACL: "public-read",
            ContentType: mimetype,
          })
          .promise();

        const imageUrl = this.getAwsS3ImageUrl(key);
        locations.push(imageUrl);
      }
      return locations;
    } catch (error) {
      throw new BadRequestException("이미지 업로드에 실패했습니다.");
    }
  }

  public async deleteFileFromS3(
    folder: string,
    location: string,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<{ success: true }> {
    const key = location.split(`s3.amazonaws.com/${folder}/`)[1];

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

  private getAwsS3ImageUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
