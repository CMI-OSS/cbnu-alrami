import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { MdReplay } from "react-icons/md";

import { cx } from "@emotion/css";
import { ScraperState, ScraperType } from "@shared/types";
import {
  pauseScraper,
  restartScraper,
  startScraper,
  stopScraper,
} from "src/lib/socket";
import { useAppSelector } from "src/store";
import { initialScraper } from "src/store/scraperSlice";
import { ScenarioQueue, ExcutionLog } from "..";
import Tooltip from "../../Tooltip";
import getStyle from "./style";

interface Props {
  scraperType: ScraperType;
}

export default function ScraperManager({ scraperType }: Props) {
  const {
    state: scraperState,
    logs,
    prevScenario,
    currentScenario,
    nextScenario,
  } = useAppSelector((state) =>
    state.scraperReducer.scrapers.find(
      (scraper) => scraper.type === scraperType,
    ),
  ) ?? initialScraper;

  const style = getStyle();

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
        <ScenarioQueue
          prev={prevScenario}
          current={currentScenario}
          next={nextScenario}
        />
        <ExcutionLog logs={logs} />
      </article>
    </section>
  );
}
