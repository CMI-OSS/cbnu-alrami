import dotenv from "dotenv";
// import mongoDB from "@src/db";
import NoticeCrawler from "@src/crawler/NoticeCrawler";

dotenv.config();
// mongoDB();

async function main() {
  NoticeCrawler.run();
}

main();
