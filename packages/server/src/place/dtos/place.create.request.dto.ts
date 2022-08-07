import { IsNotEmpty, IsOptional } from "class-validator";

import { AREA } from "../../commons/entities/school.entity";

export class PlaceCreateRequestDto {
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

  @IsOptional()
  tags: string;

  @IsOptional()
  imageIds: number[];

  @IsNotEmpty()
  buildingNumber: string;

  @IsNotEmpty()
  oldBuildingNumber: string;

  @IsOptional()
  area: AREA;
}
