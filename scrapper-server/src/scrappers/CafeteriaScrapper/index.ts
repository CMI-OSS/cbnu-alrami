import Scrapper from "@src/scrappers/Scrapper";
import { CafeteriaScript } from "@src/interfaces";
import { Scenario } from "../Scenario";
import find from "find";
import { WeekMenu } from "@src/interfaces/cafeteria/WeekMenu";
class CafeteriaScrapper extends Scrapper<CafeteriaScript> {
  constructor() {
    super(__dirname + "/scripts");
  }

  loadScript(scriptPath: string) {
    find.file(/\.js$/, scriptPath, (paths: string[]) => {
      for (const path of paths) {
        const script = require(path);
        this.queue.push(new Scenario(script));
      }
      this.loadedScript = true;
    });
  }

  async scrapping(scenario: Scenario<CafeteriaScript>): Promise<WeekMenu> {
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
    const menus = await this.cralwer.evaluate(`script.getMenus()`);
    return menus;
  }
}

export default new CafeteriaScrapper();
