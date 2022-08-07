import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Weather } from "../commons/entities/weather.entity";
import { GetWeatherResponseDto } from "./dtos/get-weather.response.dto";
import { WeatherService } from "./weather.service";

@Controller("weathers")
@ApiTags("[weather] 날씨 도메인 API")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({
    summary: "날씨 조회 API",
    description: "홈 화면에서 날씨를 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "날씨 테이블의 최근 객체 값",
    type: Weather,
  })
  async getWeather(): Promise<GetWeatherResponseDto> {
    return this.weatherService.getWeather();
  }
}
