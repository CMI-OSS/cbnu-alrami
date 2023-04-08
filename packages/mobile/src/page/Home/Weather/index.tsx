import dayjs from "dayjs";
import find from "lodash/find";
import BorderBox from "src/components/atoms/BorderBox";
import { Info } from "src/components/atoms/icon";
import { useWeathersQuery } from "src/hooks/api/weather";

import SuggestionModal from "../SuggestionModal";
import { iconToBackgrounds } from "./constants";
import $ from "./style.module.scss";

type Props = {
  isOpen: boolean;
  onSuggestionModalOpen: () => void;
  onSuggestionModalClose: () => void;
};

function Weather({
  isOpen,
  onSuggestionModalOpen,
  onSuggestionModalClose,
}: Props) {
  const { data } = useWeathersQuery();
  if (!data) return null;

  const { currentWeather, currentTemp } = data;
  const currentTime = dayjs().hour() >= 12 ? "night" : "morning";
  const timeTarget = find(iconToBackgrounds, ({ type, time }) => {
    return type === currentWeather && time === currentTime;
  });
  const target = find(iconToBackgrounds, ({ type }) => {
    return type === currentWeather;
  });
  const iconToBackground = timeTarget ?? target;

  return (
    <div className={$.weather}>
      {isOpen && (
        <SuggestionModal
          currentTemperature={currentTemp}
          onClick={onSuggestionModalClose}
        />
      )}

      <BorderBox
        height={156}
        background={iconToBackground?.backgroundColor}
        className={$["weather-box"]}
      >
        <div className={$.first}>
          <span className={$.amount}>
            {data.currentTemp ? `${data.currentTemp}°C` : "날씨 정보 없음"}
          </span>
          <span className={$.description}>청주, {iconToBackground?.text}</span>
          <span className={$.celsius}>
            {data.minTemp} °C / {data.maxTemp}°C
          </span>
        </div>
        <div className={$.second}>
          {iconToBackground?.icon && <iconToBackground.icon />}
          <button
            className={$.more}
            type="button"
            onClick={onSuggestionModalOpen}
          >
            <Info size={14} stroke="#aaa" />
            기온별 옷차림
          </button>
        </div>
      </BorderBox>
    </div>
  );
}

export default Weather;
