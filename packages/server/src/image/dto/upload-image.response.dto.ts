import { ApiProperty } from "@nestjs/swagger";

export class UploadImageResponse {
  @ApiProperty({ description: "이미지 URL" })
  urls: string[];

  @ApiProperty({ description: "이미지 ID" })
  imageIds: string[];
}
