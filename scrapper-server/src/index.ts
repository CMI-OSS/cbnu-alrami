import dotenv from "dotenv";
// import mongoDB from "@src/db";
import CalendarScrapper from "@src/scrappers/CalendarScrapper";
import NoticeScrapper from "@src/scrappers/NoticeScrapper";
import DomitoryScrapper from "@src/scrappers/DomitoryScrapper";


dotenv.config();
// mongoDB();

async function main() {
  NoticeScrapper.run();
  CalendarScrapper.run();
  DomitoryScrapper.run();
}

main();
