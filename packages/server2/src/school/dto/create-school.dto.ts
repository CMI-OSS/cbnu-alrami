import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsObject } from "class-validator";
import { CreatePlaceDto } from "src/place/dto/create-place.dto";

import { School } from "../entities/school.entity";

export class SchoolDto extends OmitType(School, [
  "id",
  "createdDateTime",
  "updatedDateTime",
  "place",
]) {}

export class CreateSchoolDto extends SchoolDto {
  @ApiProperty({ type: CreatePlaceDto })
  @IsObject()
  place: CreatePlaceDto;
}
