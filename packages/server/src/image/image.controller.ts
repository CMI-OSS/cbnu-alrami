import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AdminGuard } from "src/admin/gurads/admin.guard";

import { Image } from "./entities/image.entity";
import { ImageService } from "./image.service";

@ApiTags("[image] 이미지 API")
@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @AdminGuard()
  @Post("/upload")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "이미지 업로드" })
  @ApiCreatedResponse({
    description: "정상적으로 이미지가 업로드된 경우",
    type: [ Image ],
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        images: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor("images"))
  upload(@UploadedFiles() images: Express.Multer.File[]) {
    return this.imageService.upload(images);
  }
}
