import { IsNotEmpty } from "class-validator";

export class BoardCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;
}
