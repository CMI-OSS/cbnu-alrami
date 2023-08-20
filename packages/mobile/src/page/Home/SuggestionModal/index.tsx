import classNames from "classnames";
import { Close } from "src/components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  currentTemperature?: number;
  onClick: () => void;
};

const TEMPERATURE_LIST = [
  {
    minTemp: 28,
    maxTemp: 100,
    displayTemp: "28°C~",
    suggestionList: "민소매, 반팔, 반바지, 원피스",
  },
  {
    minTemp: 23,
    maxTemp: 27,
    displayTemp: "23~27°C",
    suggestionList: "반팔, 얇은 셔츠, 반바지, 면바지",
  },
  {
    minTemp: 20,
    maxTemp: 22,
    displayTemp: "20~22°C",
    suggestionList: "얇은 가디건, 긴팔, 면바지, 청바지",
  },
  {
    minTemp: 17,
    maxTemp: 19,
    displayTemp: "17~19°C",
    suggestionList: "얇은 니트, 맨투맨, 가디건, 청바지",
  },
  {
    minTemp: 12,
    maxTemp: 16,
    displayTemp: "12~16°C",
    suggestionList: "후드티, 바람막이, 슬랙스",
  },
  {
    minTemp: 9,
    maxTemp: 11,
    displayTemp: "9~11°C",
    suggestionList: "자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹",
  },
  {
    minTemp: 5,
    maxTemp: 8,
    displayTemp: "5~8°C",
    suggestionList: "코트, 가죽자켓, 히트텍, 니트, 레깅스",
  },
  {
    minTemp: -100,
    maxTemp: 4,
    displayTemp: "~4°C",
    suggestionList: "패딩, 두꺼운코트, 목도리, 기모제품",
  },
];

function compareTemperature(
  minTemp: number | null,
  maxTemp: number | null,
  currentTemperature?: number,
) {
  if (!currentTemperature) return false;
  const currentTemperatureInt = Math.round(currentTemperature);
  if (!minTemp) {
    if (maxTemp! >= currentTemperatureInt) return true;
    return false;
  }
  if (!maxTemp) {
    if (minTemp! <= currentTemperatureInt) return true;
    return false;
  }
  return minTemp <= currentTemperatureInt && currentTemperatureInt <= maxTemp;
}

function SuggestionModal({ currentTemperature, onClick }: Props) {
  return (
    <div className={$["suggestion-modal"]}>
      <div className={$["content-box"]}>
        <div className={$["scroll-box"]}>
          <div className={$.content}>
            <ul className={$["temperature-list"]}>
              {TEMPERATURE_LIST.map(({ minTemp, maxTemp, displayTemp }) => {
                return (
                  <li
                    key={displayTemp}
                    className={classNames($.temperature, {
                      [$["current-temperature"]]: compareTemperature(
                        minTemp,
                        maxTemp,
                        currentTemperature,
                      ),
                    })}
                  >
                    {displayTemp}
                  </li>
                );
              })}
            </ul>
            <div className={$["temperature-bar"]}></div>
            <ul className={$["suggestion-list"]}>
              {TEMPERATURE_LIST.map(({ minTemp, maxTemp, suggestionList }) => {
                return (
                  <li
                    key={suggestionList}
                    className={classNames($.suggestion, {
                      [$["current-suggestion"]]: compareTemperature(
                        minTemp,
                        maxTemp,
                        currentTemperature,
                      ),
                    })}
                  >
                    {suggestionList}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={$["top-gradient-box"]}></div>
        <div className={$["bottom-gradient-box"]}></div>
        <button
          className={$["close-button"]}
          type="button"
          aria-label="옷차림 추천 닫기"
          onClick={onClick}
        >
          <Close size={14} stroke="#5E5E5E" />
        </button>
      </div>
    </div>
  );
}

export default SuggestionModal;
