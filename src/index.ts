import NoticeCrawler from "@src/components/NoticeCrawler";
import { getSiteScriptList } from "@src/utils/siteScript";

const siteScriptList = getSiteScriptList();

async function main() {
  await NoticeCrawler.start(siteScriptList);
}


main()