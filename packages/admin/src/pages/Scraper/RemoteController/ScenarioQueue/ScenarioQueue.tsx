import { ScraperType } from "@shared/types";
import { useAppSelector } from "src/store";
import { initialScraper } from "src/store/scraperSlice";

import ScenarioQueueView from "./ScenarioQueue.view";

interface Props {
  scraperType: ScraperType;
}

export default function ScenarioQueue({ scraperType }: Props) {
  const { prevScenario, currentScenario, nextScenario } =
    useAppSelector((state) =>
      state.scraperReducer.scrapers.find(
        (scraper) => scraper.type === scraperType,
      ),
    ) ?? initialScraper;

  return (
    <ScenarioQueueView
      prev={prevScenario}
      current={currentScenario}
      next={nextScenario}
    />
  );
}
