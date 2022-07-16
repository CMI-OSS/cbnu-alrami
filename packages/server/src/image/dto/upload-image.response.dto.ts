import { ApiProperty } from "@nestjs/swagger";

export class UploadImageResponse {
  @ApiProperty({ description: "이미지 ID" })
  id: number;

  @ApiProperty({ description: "이미지 URL" })
  url: string;
}
