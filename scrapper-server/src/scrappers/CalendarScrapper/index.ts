import Scrapper from "@src/scrappers/Scrapper";
import { CalendarScript } from "@src/interfaces";
import { Scenario } from "../Scenario";
import ArrayToDate from "./ArrayToDate";

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

    const refinedData = [];

    for (let i = 0; i < calendarScript.years.length; i++) {
      await this.cralwer.goto(calendarScript.url + calendarScript.years[i].key);
      await this.cralwer.waitForSelector(calendarScript.waitCalendarSelector);
      await this.evaluateScript(calendarScript);
      const data = await this.cralwer.evaluate("script.getSchedules()");
      for (let j = 0; j < data.length; j++) {
        refinedData.push({
          ...ArrayToDate(calendarScript.years[i].year, data[j][0]),
          content: data[j][1],
        });
      }
    }
    console.log(refinedData);
  }
}

export default new CalendarScrapper();
