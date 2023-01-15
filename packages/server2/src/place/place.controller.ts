import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

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
  findAll() {
    return this.placeService.findSchool();
  }
}
