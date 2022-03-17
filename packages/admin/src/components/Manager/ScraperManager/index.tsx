import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import cx from "classnames";
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
import $ from "./style.module.scss";

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
    <section className={$.container}>
      <article className={$["manager-header"]}>
        <h2>스크래퍼 관리</h2>
        <div>
          <button type="button">
            <FaPlay
              className={cx($.play, {
                [$.disabled]: scraperState === ScraperState.Running,
              })}
              onClick={startScraping}
            />
            {/* <span className={$.tooltip}>스크래핑 시작</span> */}
            <Tooltip content="스크래핑 시작" parent={$.button} />
          </button>

          <button type="button">
            <FaPause
              className={cx($.pause, {
                [$.disabled]:
                  scraperState === ScraperState.Pause ||
                  scraperState === ScraperState.Stopped,
              })}
              onClick={pauseScraping}
            />
            <span>스크래핑 일시정지</span>
          </button>

          <button type="button">
            <FaStop
              className={cx($.stop, {
                [$.disabled]: scraperState === ScraperState.Stopped,
              })}
              onClick={stopScraping}
            />
            <span>스크래핑 정지</span>
          </button>

          <button type="button">
            <MdReplay
              className={cx($.replay, {
                [$.disabled]: scraperState === ScraperState.Stopped,
              })}
              onClick={restartScraping}
            />
            <span>스크래핑 다시시작</span>
          </button>
        </div>
      </article>
      <article className={$["manager-container"]}>
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
