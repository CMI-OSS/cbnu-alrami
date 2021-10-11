import dotenv from "dotenv";
// import mongoDB from "@src/db";
import NoticeScrapper from "@src/scrappers/NoticeScrapper";

dotenv.config();
// mongoDB();

async function main() {
  NoticeScrapper.run();
}

main();
