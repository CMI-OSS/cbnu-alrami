import Scraper from "../Scraper";
import { Scenario } from "../Scenario";
import { DomitoryScript } from "src/interfaces/DomitoryScript";
import { DomitoryFood } from "src/interfaces/DomitoryFood";

class DomitoryScraper extends Scraper<DomitoryScript> {
  constructor() {
    super(__dirname + "/scripts");
  }

  async start() {
    const scripts = await this.loadScripts();

    for (const script of scripts) {
      this.appendScenario(new Scenario(script));
    }

    this.run();
  }
  async scrapping(scenario: Scenario<DomitoryScript>) {
    const foodList = await this.getFoodList(scenario);
    console.log(foodList);
  }

  async getFoodList(
    scenario: Scenario<DomitoryScript>,
  ): Promise<DomitoryFood[]> {
    try {
      const { jsScript } = scenario;

      if (!this.scraper) throw Error("크롤러 없음");
      if (!jsScript) throw Error("스크립트 없음.");

      let allFoodList = [];

      for (let i = 0; i < jsScript.domitories.length; i++) {
        await this.scraper.goto(
          jsScript.baseUrl + jsScript.domitories[i].typeQuery,
        );
        await this.scraper.waitForSelector(jsScript.waitMainTableSelector);
        await this.evaluateScript(jsScript);

        const foodList = await this.scraper.evaluate(
          `script.getFoodList(${i})`,
        );
        allFoodList.push(...foodList);
      }

      if (allFoodList.length === 0) throw Error("학생생활관 식단 크롤링 실패");

      return allFoodList;
    } catch (error) {
      throw error;
    }
  }
}

export default new DomitoryScraper();
