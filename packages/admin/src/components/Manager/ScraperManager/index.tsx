import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { MdReplay } from "react-icons/md";

import { cx } from "@emotion/css";
import {
  noticeScenarioQueue,
  studentScenarioQueue,
  domitoryScenarioQueue,
  scheduleScenarioQueue,
} from "src/__mockData__";
import { ScraperState, ScraperType } from "@shared/types";
import {
  pauseScraper,
  restartScraper,
  startScraper,
  stopScraper,
} from "src/lib/socket";
import { useAppSelector } from "src/store";
import { ScenarioQueue, ExcutionLog } from "..";
import Tooltip from "../../Tooltip";
import getStyle from "./style";

interface Props {
  scraperType: ScraperType;
}

export default function ScraperManager({ scraperType }: Props) {
  const scraper = useAppSelector((state) =>
    state.scraperReducer.scrapers.find(
      (scraper) => scraper.type === scraperType,
    ),
  );

  const { state: scraperState } = scraper ?? { state: ScraperState.Stopped };

  const style = getStyle();

  const getMockScenarioQueue = () => {
    if (scraperType === "notice") return noticeScenarioQueue;
    if (scraperType === "domitoryCafeteria") return domitoryScenarioQueue;
    if (scraperType === "studentCafeteria") return studentScenarioQueue;

    return scheduleScenarioQueue;
  };

  const startScraping = () => {
    if (scraperState === ScraperState.Running) return;
    startScraper(scraperType);
  };

  const pauseScraping = () => {
    if (
      scraperState === ScraperState.Pause ||
      scraperState === ScraperState.Stopped
    )
      return;
    pauseScraper(scraperType);
  };

  const stopScraping = () => {
    if (scraperState === ScraperState.Stopped) return;
    stopScraper(scraperType);
  };

  const restartScraping = () => {
    if (scraperState === ScraperState.Stopped) return;
    restartScraper(scraperType);
  };

  return (
    <section className={style.manager}>
      <article className={style.managerHeader}>
        <h2 className={style.managerTitle}>스크래퍼 관리</h2>
        <div className={style.buttonBox}>
          <button type="button" className={style.button}>
            <FaPlay
              className={cx(style.play, {
                [style.disabled]: scraperState === ScraperState.Running,
              })}
              onClick={startScraping}
            />
            {/* <span className={style.tooltip}>스크래핑 시작</span> */}
            <Tooltip content="스크래핑 시작" parent={style.button} />
          </button>

          <button type="button" className={style.button}>
            <FaPause
              className={cx(style.pause, {
                [style.disabled]:
                  scraperState === ScraperState.Pause ||
                  scraperState === ScraperState.Stopped,
              })}
              onClick={pauseScraping}
            />
            <span className={style.tooltip}>스크래핑 일시정지</span>
          </button>

          <button type="button" className={style.button}>
            <FaStop
              className={cx(style.stop, {
                [style.disabled]: scraperState === ScraperState.Stopped,
              })}
              onClick={stopScraping}
            />
            <span className={style.tooltip}>스크래핑 정지</span>
          </button>

          <button type="button" className={style.button}>
            <MdReplay
              className={cx(style.replay, {
                [style.disabled]: scraperState === ScraperState.Stopped,
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
