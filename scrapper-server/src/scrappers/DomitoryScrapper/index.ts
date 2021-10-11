import Scrapper from "../Scrapper";
import { Scenario } from "../Scenario";
import { DomitoryScript } from "@src/interfaces/DomitoryScript";
import { DomitoryFood } from "@src/interfaces/DomitoryFood";

class DomitoryScrapper extends Scrapper<DomitoryScript> {
  constructor() {
    super(__dirname + "/scripts");
  }

  async scrapping(scenario: Scenario<DomitoryScript>) {
    const foodList = await this.getFoodList(scenario);
    console.log(foodList);
  }

  async getFoodList(
    scenario: Scenario<DomitoryScript>
  ): Promise<DomitoryFood[]> {
    try {
      const { jsScript } = scenario;

      if (!this.cralwer) throw Error("크롤러 없음");
      if (!jsScript) throw Error("스크립트 없음.");

      let allFoodList = [];

      for (let i = 0; i < jsScript.domitories.length; i++) {
        await this.cralwer.goto(
          jsScript.baseUrl + jsScript.domitories[i].typeQuery
        );
        await this.cralwer.waitForSelector(jsScript.waitMainTableSelector);
        await this.evaluateScript(jsScript);

        const foodList = await this.cralwer.evaluate(
          `script.getFoodList(${i})`
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

export default new DomitoryScrapper();
