import "src/common/env";
import CalendarScraper from "src/scrapers/CalendarScraper";
import NoticeScraper from "src/scrapers/NoticeScraper";
import DomitoryScraper from "src/scrapers/DomitoryScraper";
import CafeteriaScraper from "src/scrapers/CafeteriaScraper";

async function main() {
  NoticeScraper.start();
  CalendarScraper.start();
  DomitoryScraper.start();
  CafeteriaScraper.start();
}

main();
