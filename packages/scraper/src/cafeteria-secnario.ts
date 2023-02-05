import { CafeteriaMenu } from "@shared/swagger-api/generated/models/CafeteriaMenu";

import { Scenario } from "./scraper";
import 별빛식당 from "./scrapers/CafeteriaScraper/scripts/별빛식당";
import 은하수식당 from "./scrapers/CafeteriaScraper/scripts/은하수식당";
import 한빛식당 from "./scrapers/CafeteriaScraper/scripts/한빛식당";

export const cafeteriaSencarios: Scenario[] = [
  {
    name: CafeteriaMenu.name.BYEOLBIT,
    url: 별빛식당.url,
    waitSelector: 별빛식당.waitSelector,
    jsScript: 별빛식당,
    scrapFunctionName: 별빛식당.getMenus.name,
  },
  {
    name: CafeteriaMenu.name.UNHASU,
    url: 은하수식당.url,
    waitSelector: 은하수식당.waitSelector,
    jsScript: 은하수식당,
    scrapFunctionName: 은하수식당.getMenus.name,
  },
  {
    name: CafeteriaMenu.name.HANBIT,
    url: 한빛식당.url,
    waitSelector: 한빛식당.waitSelector,
    jsScript: 한빛식당,
    scrapFunctionName: 한빛식당.getMenus.name,
  },
];
