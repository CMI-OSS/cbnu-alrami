import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";

@Injectable()
export class AwsService {
  private readonly bucketName;
  private readonly awsS3: S3;

  constructor(private readonly configService: ConfigService) {
    const s3 = this.configService.get("aws.s3");

    this.awsS3 = new S3(s3);
    this.bucketName = s3.bucketName;
  }

  async uploadImages(images: Express.Multer.File[]): Promise<string[]> {
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
      console.log(error);
      throw new BadRequestException("이미지 업로드에 실패했습니다.");
    }
  }
}
