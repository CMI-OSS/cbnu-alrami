import dotenv from "dotenv";
import mongoDB from "@src/db";
import NoticeCrawler from "@src/components/NoticeCrawler";
import { getSiteScriptList } from "@src/utils/siteScript";

dotenv.config()
mongoDB()

const siteScriptList = getSiteScriptList();

async function main() {
  await NoticeCrawler.start(siteScriptList);
}


main()