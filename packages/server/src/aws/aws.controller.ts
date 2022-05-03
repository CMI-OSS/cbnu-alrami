import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/commons/decorators/public.decorator";

import { AwsService } from "./aws.service";

@Controller()
@ApiTags("[image] 이미지 업로드 API")
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Public()
  @Post("upload/images")
  @UseInterceptors(FilesInterceptor("image", 10))
  @ApiOperation({
    summary: "이미지 업로드 API",
    description: "이미지를 AWS S3에 업로드합니다.",
  })
  @ApiBody({
    schema: {
      example: {
        image: [ "image.jpg", "image.png" ],
      },
      type: "Express.Multer.File[]",
    },
  })
  @ApiResponse({
    status: 201,
    description: "이미지 URI",
    type: "string[]",
    isArray: true,
  })
  async uploadImages(
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<string[]> {
    return this.awsService.uploadImagesToS3(images);
  }
}
