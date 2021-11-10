import dotenv from "dotenv";
import CalendarScraper from "./scrapers/CalendarScraper";
import NoticeScraper from "./scrapers/NoticeScraper";
import DomitoryScraper from "./scrapers/DomitoryScraper";
import CafeteriaScraper from "./scrapers/CafeteriaScraper";

dotenv.config();
// mongoDB();

async function main() {
  NoticeScraper.start();
  CalendarScraper.start();
  DomitoryScraper.start();
  CafeteriaScraper.start();
}

main();
