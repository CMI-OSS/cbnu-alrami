import dotenv from "dotenv";
// import mongoDB from "@src/db";
import CafeteriaScrapper from "@src/scrappers/CafeteriaScrapper";

dotenv.config();
// mongoDB();

async function main() {
  CafeteriaScrapper.run();
}

main();
