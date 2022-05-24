/* eslint-disable react/jsx-pascal-case */

import dayjs from "dayjs";
import find from "lodash/find";
import BorderBox from "src/components/atoms/BorderBox";
import {
  Info,
  가끔눈_낮,
  가끔눈_밤,
  가끔눈또는비_낮,
  가끔눈또는비_밤,
  가끔비_낮,
  가끔비_밤,
  가끔비또는눈_낮,
  가끔비또는눈_밤,
  구름많음_낮,
  구름많음_밤,
  구름조금_낮,
  구름조금_밤,
  눈_낮,
  눈_밤,
  눈또는비,
  맑음_낮,
  맑음_밤,
  박무,
  비,
  비또는눈,
  소나기,
  안개,
  연무,
  천둥번개,
  황사,
  흐림,
} from "src/components/atoms/icon";

import $ from "./style.module.scss";

const colors = {
  morning: "#E0F0FF",
  night: "#E6ECFA",
  cloudy: "#E9ECF2",
  dusty: "#ECEAE6",
};
const iconToBackgrounds = [
  { backgroundColor: colors.morning, icon: <가끔눈_낮 />, key: "가끔눈_낮" },
  { backgroundColor: colors.night, icon: <가끔눈_밤 />, key: "가끔눈_밤" },
  {
    backgroundColor: colors.cloudy,
    icon: <가끔눈또는비_낮 />,
    key: "가끔눈또는비_낮",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <가끔눈또는비_밤 />,
    key: "가끔눈또는비_밤",
  },
  { backgroundColor: colors.cloudy, icon: <가끔비_낮 />, key: "가끔비_낮" },
  { backgroundColor: colors.cloudy, icon: <가끔비_밤 />, key: "가끔비_밤" },
  {
    backgroundColor: colors.cloudy,
    icon: <가끔비또는눈_낮 />,
    key: "가끔비또는눈_낮",
  },
  {
    backgroundColor: colors.cloudy,
    icon: <가끔비또는눈_밤 />,
    key: "가끔비또는눈_밤",
  },
  {
    backgroundColor: colors.morning,
    icon: <구름많음_낮 />,
    key: "구름많음_낮",
  },
  { backgroundColor: colors.night, icon: <구름많음_밤 />, key: "구름많음_밤" },
  {
    backgroundColor: colors.morning,
    icon: <구름조금_낮 />,
    key: "구름조금_낮",
  },
  { backgroundColor: colors.night, icon: <구름조금_밤 />, key: "구름조금_밤" },
  { backgroundColor: colors.morning, icon: <눈_낮 />, key: "눈_낮" },
  { backgroundColor: colors.night, icon: <눈_밤 />, key: "눈_밤" },
  { backgroundColor: colors.cloudy, icon: <눈또는비 />, key: "눈또는비" },
  { backgroundColor: colors.morning, icon: <맑음_낮 />, key: "맑음_낮" },
  { backgroundColor: colors.night, icon: <맑음_밤 />, key: "맑음_밤" },
  { backgroundColor: colors.cloudy, icon: <박무 />, key: "박무" },
  { backgroundColor: colors.cloudy, icon: <비 />, key: "비" },
  { backgroundColor: colors.cloudy, icon: <비또는눈 />, key: "비또는눈" },
  { backgroundColor: colors.cloudy, icon: <소나기 />, key: "소나기" },
  { backgroundColor: colors.cloudy, icon: <안개 />, key: "안개" },
  { backgroundColor: colors.cloudy, icon: <연무 />, key: "연무" },
  { backgroundColor: colors.cloudy, icon: <천둥번개 />, key: "천둥번개" },
  { backgroundColor: colors.dusty, icon: <황사 />, key: "황사" },
  { backgroundColor: colors.cloudy, icon: <흐림 />, key: "흐림" },
];

function Weather() {
  const time = dayjs().hour() >= 12 ? "밤" : "낮";
  const timeTarget = find(
    iconToBackgrounds,
    (o) => o.key === `천둥번개${time}`,
  );
  const target = find(iconToBackgrounds, (o) => o.key === `천둥번개`);
  const iconToBackground = timeTarget ?? target;

  return (
    <div className={$.weather}>
      <BorderBox height={155} background={iconToBackground?.backgroundColor}>
        <div className={$.first}>
          <span className={$.amount}>25°C</span>흐림
          <span className={$.description}>청주, 구름 조금</span>
          <span className={$.celsius}>-11.0 °C / 2.0°C</span>
        </div>
        <div className={$.second}>
          <div style={{ width: "66px", height: "55px" }}>
            {iconToBackground?.icon}
          </div>
          <div className={$.more}>
            <Info width="14" height="14" />
            기온별 옷차림
          </div>
        </div>
      </BorderBox>
    </div>
  );
}

export default Weather;
