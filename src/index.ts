import dotenv from "dotenv";
import mongoDB from "@src/db";
import NoticeCrawler from "@src/crawler/NoticeCrawler";
import { getSiteScriptList } from "@src/common/siteScript";

dotenv.config()
mongoDB()

const siteScriptList = getSiteScriptList();

async function main() {
  await NoticeCrawler.start(siteScriptList);
}


main()