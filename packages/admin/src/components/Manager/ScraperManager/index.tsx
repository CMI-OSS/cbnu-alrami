import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { MdReplay } from "react-icons/md";

import { cx } from "@emotion/css";
import { ScenarioQueue, ExcutionLog } from "..";
import Tooltip from "../../Tooltip";
import {
  noticeScenarioQueue,
  studentScenarioQueue,
  domitoryScenarioQueue,
  scheduleScenarioQueue,
} from "../../../__mockData__";
import getStyle from "./style";

interface matchProps {
  scraperType: string;
}

export default function ScraperManager() {
  const initialState = {
    isPlay: false,
    isPause: false,
    isStop: false,
    isReplay: false,
  };

  const [ buttonState, setButtonState ] = useState(initialState);
  const match = useRouteMatch<matchProps>("/scraper/:scraperType");
  const scraperType = match?.params.scraperType;
  const style = getStyle();

  const getMockScenarioQueue = () => {
    if (scraperType === "notice") return noticeScenarioQueue;
    if (scraperType === "domitory") return domitoryScenarioQueue;
    if (scraperType === "student") return studentScenarioQueue;

    return scheduleScenarioQueue;
  };

  const startScraping = () => {
    if (!buttonState.isPlay)
      setButtonState({
        isPlay: true,
        isPause: false,
        isStop: false,
        isReplay: false,
      });
  };

  const pauseScraping = () => {
    if (!buttonState.isPause)
      setButtonState({
        isPlay: false,
        isPause: true,
        isStop: false,
        isReplay: false,
      });
  };

  const stopScraping = () => {
    if (!buttonState.isStop)
      setButtonState({
        isPlay: true,
        isPause: true,
        isStop: true,
        isReplay: false,
      });
  };

  const restartScraping = () => {
    if (!buttonState.isReplay)
      setButtonState({
        isPlay: true,
        isPause: false,
        isStop: false,
        isReplay: true,
      });
  };

  return (
    <section className={style.manager}>
      <article className={style.managerHeader}>
        <h2 className={style.managerTitle}>스크래퍼 관리</h2>
        <div className={style.buttonBox}>
          <button type="button" className={style.button}>
            <FaPlay
              className={cx(style.play, {
                [style.disabled]: buttonState.isPlay,
              })}
              onClick={startScraping}
            />
            {/* <span className={style.tooltip}>스크래핑 시작</span> */}
            <Tooltip content="스크래핑 시작" parent={style.button} />
          </button>

          <button type="button" className={style.button}>
            <FaPause
              className={cx(style.pause, {
                [style.disabled]: buttonState.isPause,
              })}
              onClick={pauseScraping}
            />
            <span className={style.tooltip}>스크래핑 일시정지</span>
          </button>

          <button type="button" className={style.button}>
            <FaStop
              className={cx(style.stop, {
                [style.disabled]: buttonState.isStop,
              })}
              onClick={stopScraping}
            />
            <span className={style.tooltip}>스크래핑 정지</span>
          </button>

          <button type="button" className={style.button}>
            <MdReplay
              className={cx(style.replay, {
                [style.disabled]: buttonState.isReplay,
              })}
              onClick={restartScraping}
            />
            <span className={style.tooltip}>스크래핑 다시시작</span>
          </button>
        </div>
      </article>
      <article className={style.managerBox}>
        <ScenarioQueue queue={getMockScenarioQueue().queue} />
        <ExcutionLog log={getMockScenarioQueue().log} />
      </article>
    </section>
  );
}
