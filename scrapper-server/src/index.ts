import dotenv from "dotenv";
// import mongoDB from "@src/db";
import NoticeScrapper from "@src/scrappers/NoticeScrapper";
import DomitoryScrapper from "@src/scrappers/DomitoryScrapper";

dotenv.config();
// mongoDB();

async function main() {
  NoticeScrapper.run();
  DomitoryScrapper.run();
}

main();
