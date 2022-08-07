import { IsNotEmpty, IsOptional } from "class-validator";

import { Image } from "../../commons/entities/image.entity";
import { AREA } from "../../commons/entities/school.entity";

export class PlacesResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longtitude: number;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  contact: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  area: AREA;

  @IsOptional()
  image: Image[];
}
