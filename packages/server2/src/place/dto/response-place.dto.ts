import { ApiProperty } from "@nestjs/swagger";
import { School } from "src/school/entities/school.entity";

import { Place } from "../entities/place.entity";

export class PlaceSchoolDto extends Place {
  @ApiProperty({ description: "학교 정보" })
  school?: School;
}
