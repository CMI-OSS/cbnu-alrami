import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Weather } from "./entities/weather.entity";
import { WeatherService } from "./weather.service";

@ApiTags("[weather] 날씨 API")
@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({
    summary: "날씨 조회 API",
    description: "홈 화면에서 날씨를 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "날씨 테이블의 최근 객체 값",
    type: Weather,
  })
  @Get()
  getWeather() {
    return this.weatherService.getWeather();
  }
}
