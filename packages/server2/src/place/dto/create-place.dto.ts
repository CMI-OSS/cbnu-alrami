import { IntersectionType, OmitType } from "@nestjs/swagger";
import { UpdatableCommonEntityKeys } from "src/common/entity";
import { CreateImageDto } from "src/image/dto/create-image.dto";

import { Place } from "../entities/place.entity";

export class CreatePlaceDto extends IntersectionType(
  OmitType(Place, [
    ...UpdatableCommonEntityKeys,
    "id",
    "createdDateTime",
    "updatedDateTime",
  ]),
  CreateImageDto,
) {}
