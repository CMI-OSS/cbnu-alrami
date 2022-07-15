declare namespace res {
  type Weather = {
    id: number;
    createdAt: string;
    // TODO: 추후 constant형태로 변경
    currentWeather: string;
    currentTemp: string;
    maxTemp: string;
    minTemp: string;
    amWeather: string;
    pmWeather: string;
    date: string;
    hour: number;
  };
}
