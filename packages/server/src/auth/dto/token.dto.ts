import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibmlja25hbWUiOiLthYzsiqTtirgg6rSA66as7J6QIiwiYXV0aG9yaXR5IjoiU3VwZXIiLCJpYXQiOjE2NTY4NTU2MDAsImV4cCI6MTY1Njg1OTIwMH0.dbszZflO5SyiWELk_neQt6I1_VsJzcxFgqHI7oVqqd0",
  })
  xAccessToken: string;
  // TODO xRefreshToken: string;
}
