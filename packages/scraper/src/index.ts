import dotenv from "dotenv";
import CalendarScraper from "@scraper/scrapers/CalendarScraper";
import NoticeScraper from "@scraper/scrapers/NoticeScraper";
import DomitoryScraper from "@scraper/scrapers/DomitoryScraper";
import CafeteriaScraper from "@scraper/scrapers/CafeteriaScraper";

dotenv.config();
// mongoDB();

async function main() {
  NoticeScraper.start();
  CalendarScraper.start();
  DomitoryScraper.start();
  CafeteriaScraper.start();
}

main();
