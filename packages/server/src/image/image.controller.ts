import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UploadImageResponse } from "./dto/upload-image.response.dto";
import { ImageService } from "./image.service";

@Controller()
@ApiTags("[image] 이미지 업로드 API")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("upload/images")
  @UseInterceptors(FilesInterceptor("image", 10))
  @ApiOperation({
    summary: "이미지 업로드 API",
    description: "이미지를 AWS S3에 업로드합니다.",
  })
  @ApiBody({
    schema: {
      properties: {
        image: { type: "File" },
      },
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
  ): Promise<UploadImageResponse[]> {
    return this.imageService.uploadImages(images);
  }
}
