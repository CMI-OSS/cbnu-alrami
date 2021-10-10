import dotenv from "dotenv";
// import mongoDB from "@src/db";
import CalendarScrapper from "@src/scrappers/CalendarScrapper";

dotenv.config();
// mongoDB();

async function main() {
  CalendarScrapper.run();
}

main();
