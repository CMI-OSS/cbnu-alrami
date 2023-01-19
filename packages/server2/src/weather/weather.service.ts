import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { firstValueFrom } from "rxjs";
import configuration from "src/config/configuration";
import { Repository } from "typeorm";

import { Weather } from "./entities/weather.entity";
import { WeatherType } from "./weather.constant";

const DAILY = "0 0 0 * * *";

@Injectable()
export class WeatherService {
  private readonly weatherKey: string;

  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
    private readonly httpService: HttpService,
  ) {
    this.weatherKey = configuration.weather.key;
  }

  private getOpenApiUrlForCBNU(): string {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=36.62858542513084&lon=127.45748680644566&appid=${this.weatherKey}&lang=kr&exclude=current,minutely,daily,alerts&units=metric`;
  }

  @Cron(DAILY)
  async createWeather(): Promise<void> {
    const weather = await firstValueFrom(
      await this.httpService.get(this.getOpenApiUrlForCBNU()),
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

    const currentDate = await WeatherService.getDate();

    for (let i = 0; i < 24; i += 1) {
      const hourlyWeather = {
        maxTemp,
        minTemp,
        amWeather,
        pmWeather,
        date: currentDate,
        hour: i,
      };

      // eslint-disable-next-line no-await-in-loop
      await this.weatherRepository.save(hourlyWeather);
    }
  }

  async getWeather() {
    const currentHour = new Date().getHours();
    const currentDate = await WeatherService.getDate();

    return this.weatherRepository.findOne({
      where: { hour: currentHour, date: currentDate },
    });
  }

  private async getMode(arr: string[]): Promise<WeatherType> {
    const object = arr.reduce((acc, cur) => {
      // eslint-disable-next-line no-unused-expressions,no-prototype-builtins
      acc.hasOwnProperty(cur) ? (acc[cur] += 1) : (acc[cur] = 1);
      return acc;
    }, {});

    return Object.keys(object).reduce((acc, cur) => {
      return object[acc] > object[cur] ? acc : cur;
    }, "") as WeatherType;
  }

  private static async getDate(): Promise<string> {
    const today = new Date();

    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  }
}
