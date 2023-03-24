import { ApiProperty } from "@nestjs/swagger";

export class ResponseLoginDto {
  @ApiProperty({
    description: "액세스 토큰",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjc0NjUzMTk0LCJleHAiOjE3MDYxODkxOTR9.c4Y-SdxTASJh8RyP5llZ5f4U-EnSrA15b_szH4GsQ3w",
    required: true,
  })
  accessToken: string;
}
