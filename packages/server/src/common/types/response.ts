import { ApiProperty } from "@nestjs/swagger";

export class MutationResponse {
  @ApiProperty({ description: "성공 여부" })
  success: boolean;
}
