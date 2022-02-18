import { ScraperManageEvent, SocketMessage } from "@shared/types/Socket";
import NoticeScraper from "src/scrapers/NoticeScraper";
import CalendarScrpaer from "src/scrapers/CalendarScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import { ScraperType } from "@shared/types";

const getScraper = (scraperType: ScraperType) => {
  if (scraperType === "notice") return NoticeScraper;
  if (scraperType === "collegeSchedule") return CalendarScrpaer;
  if (scraperType === "domitoryCafeteria") return DomitoryScraper;
  if (scraperType === "studentCafeteria") return CafeteriaScraper;

  throw new Error(`Not found "${scraperType}" scraper `);
};

const socketHandler = ({ event, payload }: SocketMessage<string, any>) => {
  if (event === ScraperManageEvent.START_SCRAPER) handleStartScraper(payload);
  if (event === ScraperManageEvent.STOP_SCRAPER) handleStopScraper(payload);
  if (event === ScraperManageEvent.PAUSE_SCRAPER) handlePauseScraper(payload);
  if (event === ScraperManageEvent.RESTART_SCRAPER)
    handleRestartScraper(payload);
};

const handleStartScraper = (scraperType: ScraperType) =>
  getScraper(scraperType).start();

const handleStopScraper = (scraperType: ScraperType) =>
  getScraper(scraperType).stop();

const handlePauseScraper = (scraperType: ScraperType) =>
  getScraper(scraperType).pause();

const handleRestartScraper = (scraperType: ScraperType) =>
  getScraper(scraperType).restart();

export { socketHandler };
