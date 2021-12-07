import { CalendarAction } from "../../interfaces/ActionInterfaces/CalendarInterface";
import Scraper from "src/scrapers/Scraper";
import { CalendarScript } from "src/interfaces";
import { Scenario } from "../Scenario";
import ArrayToDate from "./ArrayToDate";
import store from "../../common/store";
import { successCalendar } from "../../actions/CalendarAction";

class CalendarScraper extends Scraper<CalendarScript> {
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
    console.log(refinedData);
    store // thunk 테스트용
      .dispatch<any>(successCalendar())
      .then((data: Promise<CalendarAction>) => console.log(data))
      .catch((e: Promise<Error>) => console.log(e));
  }
}

export default new CalendarScraper();
