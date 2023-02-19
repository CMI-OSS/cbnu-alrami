import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { IsObject, IsOptional } from "class-validator";
import { UpdatableCommonEntityKeys } from "src/common/entity";
import { CreateImageDto } from "src/image/dto/create-image.dto";
import { SchoolDto } from "src/school/dto/create-school.dto";

import { Place } from "../entities/place.entity";

export class CreatePlaceDto extends IntersectionType(
  OmitType(Place, [
    ...UpdatableCommonEntityKeys,
    "id",
    "createdDateTime",
    "updatedDateTime",
    "images",
    "school",
  ]),
  CreateImageDto,
) {
  @ApiProperty({ description: "학교 정보", type: () => SchoolDto })
  @IsObject()
  @IsOptional()
  school?: SchoolDto;
}
