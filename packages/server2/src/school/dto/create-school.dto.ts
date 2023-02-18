import { OmitType } from "@nestjs/swagger";
import { UpdatableCommonEntityKeys } from "src/common/entity";
import { CreatePlaceDto } from "src/place/dto/create-place.dto";

import { School } from "../entities/school.entity";

export class SchoolDto extends OmitType(School, [
  ...UpdatableCommonEntityKeys,
  "id",
  "createdDateTime",
  "updatedDateTime",
  "place",
]) {}

export class CreateSchoolDto extends SchoolDto {
  place: CreatePlaceDto;
}
