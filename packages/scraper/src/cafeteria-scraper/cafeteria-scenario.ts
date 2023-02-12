import { CafeteriaMenu } from "@shared/swagger-api/generated/models/CafeteriaMenu";

import { Scenario } from "../scraper/scraper";
import 별빛식당 from "./scripts/별빛식당";
import 본관 from "./scripts/본관";
import 양성재 from "./scripts/양성재";
import 양진재 from "./scripts/양진재";
import 은하수식당 from "./scripts/은하수식당";
import 한빛식당 from "./scripts/한빛식당";

export const cafeteriaScenarios: Scenario[] = [
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
  {
    name: CafeteriaMenu.name.BONGWAN,
    url: 본관.url,
    waitSelector: 본관.waitMainTableSelector,
    jsScript: 본관,
    scrapFunctionName: 본관.getFoodList.name,
  },
  {
    name: CafeteriaMenu.name.YANGSUNGJAE,
    url: 양성재.url,
    waitSelector: 양성재.waitMainTableSelector,
    jsScript: 양성재,
    scrapFunctionName: 양성재.getFoodList.name,
  },
  {
    name: CafeteriaMenu.name.YANGJINJAE,
    url: 양진재.url,
    waitSelector: 양진재.waitMainTableSelector,
    jsScript: 양진재,
    scrapFunctionName: 양진재.getFoodList.name,
  },
];
