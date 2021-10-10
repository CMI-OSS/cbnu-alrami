import Scrapper from "@src/scrappers/Scrapper";
import { CalendarScript } from "@src/interfaces";
import { Scenario } from "../Scenario";

class CalendarScrapper extends Scrapper<CalendarScript> {
  constructor() {
    super(__dirname + "/scripts");
  }

  async scrapping(scenario: Scenario<CalendarScript>) {
    if (this.cralwer === null) {
      throw Error("크롤러 없음");
    }

    const { jsScript: calendarScript } = scenario;

    if (calendarScript === undefined) {
      throw Error("스크립트 없음");
    }

    await this.cralwer.goto(calendarScript.url);
    await this.evaluateScript(calendarScript);
    const data = await this.cralwer.evaluate("script.getSchedules()");
    console.log(data);
  }
}

export default new CalendarScrapper();
