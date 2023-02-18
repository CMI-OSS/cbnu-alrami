import { ScraperType } from "@shared/types";
import { createCafeteriaMenu } from "src/api/cafeteriaMenu";
import { IS_TEST } from "src/common/isDev";
// import { createMenu } from "src/db/restaurant";
import { CafeteriaScript } from "src/types";
import { Menu } from "src/types/Menu";

import { Scenario } from "../Scenario";
import Scraper from "../Scraper";

class CafeteriaScraper extends Scraper<CafeteriaScript> {
  name = "학생식당";
  type: ScraperType = "cafeteria";

  constructor() {
    super(`${__dirname}/scripts`);
  }

  async initScript() {
    const scripts = await this.loadScripts();

    scripts.forEach((script) => {
      this.appendScenario(new Scenario(script.restaurant_name, script));
    });
  }

  async scraping(scenario: Scenario<CafeteriaScript>): Promise<Menu[]> {
    if (this.scraper === null) {
      throw Error("크롤러 없음");
    }

    const { jsScript: cafeteriaScript } = scenario;

    if (cafeteriaScript === undefined) {
      throw Error("스크립트 없음");
    }

    await this.scraper.goto(cafeteriaScript.url);
    await this.scraper.waitForSelector(cafeteriaScript.waitSelector);
    await this.evaluateScript(cafeteriaScript);
    const menus: Menu[] = await this.scraper.evaluate(`script.getMenus()`);

    for (const menu of menus) {
      if (IS_TEST) {
        console.log(menu);
      } else {
        await createCafeteriaMenu({
          cafeteriaId: menu.cafeteriaId,
          menu: {
            content: menu.menu,
            time: menu.time,
            date: menu.date,
          },
        });
      }
    }

    return menus;
  }
}

export default new CafeteriaScraper();
