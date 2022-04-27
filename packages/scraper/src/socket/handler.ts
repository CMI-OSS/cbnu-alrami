import { ScraperType } from "@shared/types";
import {
  CommandScraperMessage,
  isCommandScraperMessage,
} from "@shared/types/Socket/CommandScraper";
import { SocketMessage } from "@shared/types/Socket/SocketMessage";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CovidScraper from "src/scrapers/CovidScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import NoticeScraper from "src/scrapers/NoticeScraper";

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
