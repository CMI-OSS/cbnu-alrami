import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class AwsService {
  private awsS3;
  private bucketName;
  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get("awsS3").accessKeyId,
      secretAccessKey: this.configService.get("awsS3").secretAccessKey,
      region: this.configService.get("awsS3").region,
    });
    this.bucketName = this.configService.get("awsS3").bucketName;
  }

  public async uploadFileToS3(
    folder: string,
    file: Express.Multer.File,
  ): Promise<string> {
    try {
      const { buffer, originalname } = file;
      const key = `${folder}/${originalname}`;
      await this.awsS3
        .upload({
          Bucket: this.bucketName,
          ACL: "public-read",
          Key: key,
          Body: buffer,
        })
        .promise();

      const location = await AwsService.getFileUri(this.bucketName, key);

      return location;
    } catch (error) {
      throw new BadRequestException("이미지 업로드에 실패했습니다.");
    }
  }

  public async deleteFileFromS3(
    location: string,
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<void> {
    const key = await AwsService.decodeUri(location);

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
    } catch (error) {
      throw new BadRequestException("이미지 삭제에 실패했습니다.");
    }
  }

  private static async getFileUri(
    bucketName: string,
    key: string,
  ): Promise<string> {
    return AwsService.encodeUri(
      `https://${bucketName}.s3.amazonaws.com/${key}`,
    );
  }

  private static async encodeUri(url: string): Promise<string> {
    return encodeURI(url);
  }

  private static async decodeUri(url: string): Promise<string> {
    return decodeURI(url).split("s3.amazonaws.com/")[1];
  }
}
