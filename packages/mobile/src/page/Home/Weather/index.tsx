/* eslint-disable react/jsx-pascal-case */

import { Weather as WeatherType } from "@shared/swagger-api/generated";
import dayjs from "dayjs";
import find from "lodash/find";
import BorderBox from "src/components/atoms/BorderBox";
import {
  Info,
  눈_낮,
  눈_밤,
  맑음_낮,
  맑음_밤,
  박무,
  비,
  안개,
  연무,
  천둥번개,
  황사,
  흐림,
} from "src/components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  weather: WeatherType;
  onSuggestionClick: () => void;
};

const colors = {
  morning: "#E0F0FF",
  night: "#E6ECFA",
  cloudy: "#E9ECF2",
  dusty: "#ECEAE6",
};

const iconToBackgrounds = [
  {
    backgroundColor: colors.morning,
    icon: <눈_낮 />,
    text: "눈",
    type: "Snow",
    time: "morning",
  },
  {
    backgroundColor: colors.night,
    icon: <눈_밤 />,
    text: "눈",
    type: "Snow",
    time: "night",
  },
  {
    backgroundColor: colors.morning,
    icon: <맑음_낮 />,
    text: "맑음",
    type: "Clear",
    time: "morning",
  },
  {
    backgroundColor: colors.night,
    icon: <맑음_밤 />,
    text: "맑음",
    type: "Clear",
    time: "night",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <박무 />,
    text: "박무",
    type: "Mist",
    time: "morning",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <비 />,
    text: "비",
    type: "Rain",
    time: "morning",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <비 />,
    text: "이슬비",
    type: "Drizzle",
    time: "morning",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <안개 />,
    text: "안개",
    type: "Fog",
    time: "morning",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <연무 />,
    text: "연무",
    type: "Haze",
    time: "morning",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <천둥번개 />,
    text: "천둥번개",
    type: "Thunderstorm",
    time: "morning",
  },
  {
    backgroundColor: colors.dusty,
    icon: <황사 />,
    text: "황사",
    type: "Dust",
    time: "morning",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <흐림 />,
    text: "흐림",
    type: "Clouds",
    time: "morning",
  },
];

function Weather({ weather, onSuggestionClick }: Props) {
  const currentTime = dayjs().hour() >= 12 ? "night" : "morning";
  const { currentWeather } = weather;
  const timeTarget = find(iconToBackgrounds, ({ type, time }) => {
    return type === currentWeather && time === currentTime;
  });
  const target = find(iconToBackgrounds, ({ type }) => {
    return type === currentWeather;
  });
  const iconToBackground = timeTarget ?? target;

  return (
    <div className={$.weather}>
      <BorderBox height={156} background={iconToBackground?.backgroundColor}>
        <div className={$.first}>
          <span className={$.amount}>{weather.currentTemp ? `${weather.currentTemp}°C` : "날씨 정보 없음"}</span>
          <span className={$.description}>청주, {iconToBackground?.text}</span>
          <span className={$.celsius}>
            {weather.minTemp} °C / {weather.maxTemp}°C
          </span>
        </div>
        <div className={$.second}>
          {iconToBackground?.icon}
          <button className={$.more} type="button" onClick={onSuggestionClick}>
            <Info size={14} stroke="#aaa" />
            기온별 옷차림
          </button>
        </div>
      </BorderBox>
    </div>
  );
}

export default Weather;
