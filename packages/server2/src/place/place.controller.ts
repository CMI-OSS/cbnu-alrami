import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SchoolArea } from "src/school/school.constant";

import { PlaceSchoolDto } from "./dto/response-place.dto";
import { PlaceService } from "./place.service";

@ApiTags("[place] 장소 API")
@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({
    summary: "학교 건물 조회",
  })
  @ApiOkResponse({ type: PlaceSchoolDto, isArray: true })
  @Get("school")
  findSchool() {
    return this.placeService.findSchool();
  }

  @ApiOperation({
    summary: "구역으로 학교 건물 조회",
    parameters: [
      {
        name: "area",
        in: "path",
        schema: { enum: Object.values(SchoolArea) },
      },
    ],
  })
  @ApiOkResponse({ type: PlaceSchoolDto, isArray: true })
  @Get("school/:area")
  findSchoolByArea(@Param("area") area?: SchoolArea) {
    return this.placeService.findSchool(area);
  }
}
