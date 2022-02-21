import NoticeScraper from "src/scrapers/NoticeScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import { ScraperType } from "@shared/types";
import { SocketMessage } from "@shared/types/Socket/SocketMessage";
import {
  CommandScraperMessage,
  isCommandScraperMessage,
} from "@shared/types/Socket/CommandScraper";

const getScraper = (scraperType: ScraperType) => {
  if (scraperType === "notice") return NoticeScraper;
  if (scraperType === "collegeSchedule") return CalendarScrpaer;
  if (scraperType === "domitoryCafeteria") return DomitoryScraper;
  if (scraperType === "studentCafeteria") return CafeteriaScraper;

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
