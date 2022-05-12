export class CreateWeatherRequestDto {
  currentWeather: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  amWeather: string;
  pmWeather: string;
  hour: number;
}
