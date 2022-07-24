import { ScraperState, ScraperType } from "@shared/types";
import {
  pauseScraper,
  restartScraper,
  startScraper,
  stopScraper,
} from "src/lib/socket";
import { useAppSelector } from "src/store";
import { initialScraper } from "src/store/scraperSlice";

import ExcutionLog from "./ExcutionLog/ExcutionLog";
import RemoteControllerView, {
  Props as ViewProps,
} from "./RemoteController.view";
import ScenarioQueue from "./ScenarioQueue/ScenarioQueue";

interface Props {
  scraperType: ScraperType;
}

export default function RemoteController({ scraperType }: Props) {
  const { state } =
    useAppSelector((state) =>
      state.scraperReducer.scrapers.find(
        (scraper) => scraper.type === scraperType,
      ),
    ) ?? initialScraper;

  const viewPros: ViewProps = {
    onClickStart: () => startScraper(scraperType),
    disableStart: state === ScraperState.Running,
    onClickPause: () => pauseScraper(scraperType),
    disablePause:
      state === ScraperState.Pause || state === ScraperState.Stopped,
    onClickStop: () => stopScraper(scraperType),
    disableStop: state === ScraperState.Stopped,
    onClickRestart: () => restartScraper(scraperType),
    disableRestart: state === ScraperState.Stopped,
  };

  return (
    <RemoteControllerView {...viewPros}>
      <>
        <ScenarioQueue scraperType={scraperType} />
        <ExcutionLog scraperType={scraperType} />
      </>
    </RemoteControllerView>
  );
}
