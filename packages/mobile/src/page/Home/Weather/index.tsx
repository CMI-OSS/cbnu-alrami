/* eslint-disable react/jsx-pascal-case */

import BorderBox from "src/components/atoms/BorderBox";
import { Info, 구름조금_낮 } from "src/components/atoms/icon";

import $ from "./style.module.scss";

const iconToBackground = new Map();
iconToBackground.set("#E0F0FF", [
  "맑음_낮",
  "구름조금_낮",
  "구름많음_낮",
  "눈",
  "가끔눈_낮",
]);
iconToBackground.set("#E9ECF2", [
  "흐림",
  "비",
  "비또는눈",
  "눈또는비",
  "천둥번개",
  "안개",
  "소나기",
  "가끔비_낮",
  "가끔비또는눈_낮",
  "가끔비_밤",
  "가끔비또는눈_밤",
  "가끔눈또는비_낮",
  "가끔눈또는비_밤",
  "연무",
  "박무",
]);
iconToBackground.set("#E6ECFA", [
  "맑음_밤",
  "구름조금_밤",
  "구름많음_밤",
  "눈",
  "가끔눈_밤",
]);
iconToBackground.set("#ECEAE6", [ "천둥번개" ]);

const targetIcon = "맑음_밤";

function Weather() {
  return (
    <div className={$.weather}>
      <BorderBox height={155} background="#EAF4FE">
        <div className={$.first}>
          <span className={$.amount}>25°C</span>림
          <span className={$.description}>청주, 구름 조금</span>
          <span className={$.celsius}>-11.0 °C / 2.0°C</span>
        </div>
        <div className={$.second}>
          <div style={{ width: "66px", height: "55px" }}>
            <구름조금_낮 />
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
