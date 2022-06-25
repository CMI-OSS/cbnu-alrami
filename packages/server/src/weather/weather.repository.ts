import { EntityRepository, Repository } from "typeorm";

import { Weather } from "../commons/entities/weather.entity";
import { GetWeatherResponseDto } from "./dtos/get-weather.response.dto";

@EntityRepository(Weather)
export class WeatherRepository extends Repository<Weather> {
  async findOneWeather(hour, date): Promise<GetWeatherResponseDto> {
    return this.createQueryBuilder("weather")
      .where("hour = :hour", { hour })
      .andWhere("date = :date", { date })
      .getOne();
  }

  async updateWeather(currentTemp, currentWeather, hour, date) {
    return this.createQueryBuilder("weather")
      .update(Weather)
      .set({ currentTemp, currentWeather })
      .where("hour = :hour", { hour })
      .andWhere("date = :date", { date })
      .execute();
  }
}
