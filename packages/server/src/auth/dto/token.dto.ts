import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  xAccessToken: string;
  // TODO xRefreshToken: string;
}
