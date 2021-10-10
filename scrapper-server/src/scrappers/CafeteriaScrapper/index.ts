import Scrapper from "@src/scrappers/Scrapper";
import { CafeteriaScript } from "@src/interfaces";
import { Scenario } from "../Scenario";

class CafeteriaScrapper extends Scrapper<CafeteriaScript> {
  constructor() {
    super(__dirname + "/scripts");
  }

  async scrapping(scenario: Scenario<CafeteriaScript>) {
    if (this.cralwer === null) {
      throw Error("크롤러 없음");
    }

    const { jsScript: cafeteriaScript } = scenario;

    if (cafeteriaScript === undefined) {
      throw Error("스크립트 없음");
    }

    await this.cralwer.goto(cafeteriaScript.url);
    await this.cralwer.waitForSelector(cafeteriaScript.waitSelector);
    await this.evaluateScript(cafeteriaScript);
    await this.cralwer.evaluate(`script.selectCafetera()`);
    const menus = await this.cralwer.evaluate(`script.getMenus()`);
    console.log(menus);
  }
}

export default new CafeteriaScrapper();
