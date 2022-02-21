import NoticeScraper from "src/scrapers/NoticeScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import CovidScraper from "src/scrapers/CovidScraper";
import { ScraperType } from "@shared/types";
import { SocketMessage } from "@shared/types/Socket/SocketMessage";
import {
  CommandScraperMessage,
  isCommandScraperMessage,
} from "@shared/types/Socket/CommandScraper";

const getScraper = (scraperType: ScraperType) => {
  if (scraperType === "notice") return NoticeScraper;
  if (scraperType === "calendar") return CalendarScrpaer;
  if (scraperType === "domitory") return DomitoryScraper;
  if (scraperType === "cafeteria") return CafeteriaScraper;
  if (scraperType === "covid") return CovidScraper;

  throw new Error(`Not found "${scraperType}" scraper `);
};

const socketHandler = (message: SocketMessage) => {
  if (isCommandScraperMessage(message)) handleScraperCommand(message);
};

const handleScraperCommand = ({
  event,
  payload: scraperType,
}: CommandScraperMessage) => {
  const scraper = getScraper(scraperType);
  if (event === "START_SCRAPER") scraper.start();
  if (event === "STOP_SCRAPER") scraper.stop();
  if (event === "PAUSE_SCRAPER") scraper.pause();
  if (event === "RESTART_SCRAPER") scraper.restart();
};

export { socketHandler };
