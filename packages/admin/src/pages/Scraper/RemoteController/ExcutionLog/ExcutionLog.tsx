import { ScraperType } from "@shared/types";
import { useAppSelector } from "src/store";
import { initialScraper } from "src/store/scraperSlice";

import ExcutionLogView from "./ExcutionLog.view";

interface Props {
  scraperType: ScraperType;
}

export default function ExcutionLog({ scraperType }: Props) {
  const { logs } =
    useAppSelector((state) =>
      state.scraperReducer.scrapers.find(
        (scraper) => scraper.type === scraperType,
      ),
    ) ?? initialScraper;

  return <ExcutionLogView logs={logs} />;
}
