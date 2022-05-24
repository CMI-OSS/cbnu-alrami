import { Injectable } from "@nestjs/common";

import { CreateWeatherRequestDto } from "./dtos/create-weather.request.dto";
import { GetWeatherResponseDto } from "./dtos/get-weather.response.dto";
import { WeatherRepository } from "./weather.repository";

@Injectable()
export class WeatherService {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async getWeather(): Promise<GetWeatherResponseDto> {
    return this.weatherRepository.findOne();
  }

  async createWeather(
    createWeatherRequestDto: CreateWeatherRequestDto,
  ): Promise<void> {
    await this.weatherRepository.save(createWeatherRequestDto);
  }
}
