import { IntersectionType, OmitType } from "@nestjs/swagger";
import { CreateImageDto } from "src/image/dto/create-image.dto";

import { Place } from "../entities/place.entity";

export class CreatePlaceDto extends IntersectionType(
  OmitType(Place, [ "id", "createdDateTime", "updatedDateTime" ]),
  CreateImageDto,
) {}
