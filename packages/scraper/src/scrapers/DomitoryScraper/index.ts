/* eslint-disable no-plusplus */
/* eslint-disable no-useless-catch */
import { ScraperType } from "@shared/types";
import { createMenu } from "src/db/restaurant";
import { DomitoryFood } from "src/types/DomitoryFood";
import { DomitoryScript } from "src/types/DomitoryScript";

import { Scenario } from "../Scenario";
import Scraper from "../Scraper";

class DomitoryScraper extends Scraper<DomitoryScript> {
  name = "기숙사 식단";
  type: ScraperType = "domitory";

  constructor() {
    super(`${__dirname}/scripts`);
  }

  async initScript() {
    const scripts = await this.loadScripts();

    for (const script of scripts) {
      this.appendScenario(new Scenario(script.domitory, script));
    }
  }

  async scrapping(scenario: Scenario<DomitoryScript>) {
    const foodList = await this.getFoodList(scenario);

    for (const menu of foodList) {
      await createMenu(menu);
    }
  }

  async getFoodList(
    scenario: Scenario<DomitoryScript>,
  ): Promise<DomitoryFood[]> {
    try {
      const { jsScript } = scenario;

      if (!this.scraper) throw Error("크롤러 없음");
      if (!jsScript) throw Error("스크립트 없음.");

      const allFoodList = [];

      await this.scraper.goto(jsScript.baseUrl + jsScript.typeQuery);
      await this.scraper.waitForSelector(jsScript.waitMainTableSelector);
      await this.evaluateScript(jsScript);

      const foodList = await this.scraper.evaluate(`script.getFoodList()`);
      allFoodList.push(...foodList);

      if (allFoodList.length === 0) throw Error("학생생활관 식단 크롤링 실패");

      return allFoodList;
    } catch (error) {
      throw error;
    }
  }
}

export default new DomitoryScraper();
