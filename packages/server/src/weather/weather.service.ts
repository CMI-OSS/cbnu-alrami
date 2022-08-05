import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron } from "@nestjs/schedule";
import { firstValueFrom } from "rxjs";

import { GetWeatherResponseDto } from "./dtos/get-weather.response.dto";
import { WeatherRepository } from "./weather.repository";

@Injectable()
export class WeatherService {
  private readonly weatherKey;

  constructor(
    private readonly configService: ConfigService,
    private readonly weatherRepository: WeatherRepository,
    private readonly httpService: HttpService,
  ) {
    this.weatherKey = this.configService.get("weatherKey");
  }

  private static async getDate(): Promise<string> {
    const today = new Date();

    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  }

  async getWeather(): Promise<GetWeatherResponseDto> {
    const hour = new Date().getHours();
    const date = await WeatherService.getDate();

    return this.weatherRepository.findOneWeather(hour, date);
  }

  @Cron("0 0 0 * * *")
  async createWeathers(): Promise<void> {
    const weather = await firstValueFrom(
      await this.httpService.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=36.62858542513084&lon=127.45748680644566&appid=${this.weatherKey}&lang=kr&exclude=current,minutely,daily,alerts&units=metric`,
      ),
    );

    const todayTemp: number[] = [];
    const todayWeather: string[] = [];

    weather.data.hourly.forEach((data) => {
      if (new Date(data.dt * 1000).getDate() === new Date().getDate()) {
        todayTemp.push(data.temp);

        data.weather.forEach((el) => {
          todayWeather.push(el.main);
        });
      }
    });

    const maxTemp = Math.max(...todayTemp);
    const minTemp = Math.min(...todayTemp);
    const amWeather = await this.getMode(todayWeather.slice(0, 12));
    const pmWeather = await this.getMode(todayWeather.slice(12));

    for (let i = 0; i < 24; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await this.weatherRepository.save({
        maxTemp,
        minTemp,
        amWeather,
        pmWeather,
        date: new Date(),
        hour: i,
      });
    }
  }

  @Cron("5 0 */1 * * *")
  async createCurrentWeather(): Promise<void> {
    const weather = await firstValueFrom(
      await this.httpService.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=36.62858542513084&lon=127.45748680644566&appid=${this.weatherKey}&lang=kr&exclude=minutely,hourly,daily,alerts&units=metric`,
      ),
    );

    const currentTemp = weather.data.current.temp;
    const currentWeather = weather.data.current.weather[0].main;

    const hour = new Date().getHours();
    const date = await WeatherService.getDate();

    await this.weatherRepository.updateWeather(
      currentTemp,
      currentWeather,
      hour,
      date,
    );
  }

  private async getMode(arr: string[]): Promise<string> {
    const object = arr.reduce((acc, cur) => {
      // eslint-disable-next-line no-unused-expressions,no-prototype-builtins
      acc.hasOwnProperty(cur) ? (acc[cur] += 1) : (acc[cur] = 1);
      return acc;
    }, {});

    return Object.keys(object).reduce((acc, cur) => {
      return object[acc] > object[cur] ? acc : cur;
    }, "");
  }
}
