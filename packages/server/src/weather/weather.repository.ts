import { EntityRepository, Repository } from "typeorm";

import { Weather } from "../commons/entities/weather.entity";
import { GetWeatherResponseDto } from "./dtos/get-weather.response.dto";

@EntityRepository(Weather)
export class WeatherRepository extends Repository<Weather> {
  async findOne(): Promise<GetWeatherResponseDto> {
    return this.createQueryBuilder("weather")
      .orderBy("weather.id", "DESC")
      .limit(1)
      .getOne();
  }
}
