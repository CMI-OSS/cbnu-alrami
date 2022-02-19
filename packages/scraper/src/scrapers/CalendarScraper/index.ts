/* eslint-disable no-plusplus */
import Scraper from "src/scrapers/Scraper";
import { ScraperType } from "@shared/types";
import { Calendar, CalendarScript } from "src/types";
import { createSchedule } from "src/db/calendar";
import { Scenario } from "../Scenario";
import ArrayToDate from "./ArrayToDate";

class CalendarScraper extends Scraper<CalendarScript> {
  type: ScraperType = "collegeSchedule";

  constructor() {
    super(`${__dirname}/scripts`);
  }

  async initScript() {
    const scripts = await this.loadScripts();

    scripts.forEach((script) => {
      this.appendScenario(new Scenario(script));
    });
  }

  async scrapping(scenario: Scenario<CalendarScript>) {
    if (this.scraper === null) {
      throw Error("크롤러 없음");
    }

    const { jsScript: calendarScript } = scenario;

    if (calendarScript === undefined) {
      throw Error("스크립트 없음");
    }

    const refinedData = [];

    for (let i = 0; i < calendarScript.years.length; i++) {
      await this.scraper.goto(calendarScript.url + calendarScript.years[i].key);
      await this.scraper.waitForSelector(calendarScript.waitCalendarSelector);
      await this.evaluateScript(calendarScript);
      const mockData = await this.scraper.evaluate("script.getSchedules()");
      for (let j = 0; j < mockData.length; j++) {
        refinedData.push({
          ...ArrayToDate(calendarScript.years[i].year, mockData[j][0]),
          content: mockData[j][1],
        });
      }
    }

    for (const schedule of refinedData) {
      await createSchedule(schedule as Calendar);
    }
  }
}

export default new CalendarScraper();
