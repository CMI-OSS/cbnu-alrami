import dotenv from "dotenv";
// import mongoDB from "@src/db";
import CalendarScraper from "@src/scrapers/CalendarScraper";
import NoticeScraper from "@src/scrapers/NoticeScraper";
import DomitoryScraper from "@src/scrapers/DomitoryScraper";
import CafeteriaScraper from "@src/scrapers/CafeteriaScraper";

dotenv.config();
// mongoDB();

async function main() {
  NoticeScraper.run();
  CalendarScraper.run();
  DomitoryScraper.run();
  CafeteriaScraper.run();
}

main();
