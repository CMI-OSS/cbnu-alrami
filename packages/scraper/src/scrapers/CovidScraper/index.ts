/* eslint-disable no-plusplus */
/* eslint-disable no-useless-catch */
import Scraper from "../Scraper";
import { Scenario } from "../Scenario";

interface covidDetailInfo {
  bar: 1;
  karaoke: 2;
  gym: 3;
  restaurantAndCafe: 5;
  PCRoom: 7;
}

interface CovidScript {
  HOMEPAGE_URL: string;
  DETAIL_PAGE_URL: string;
  getCovidNumber: () => string;
  getCovidDetailInfo: () => covidDetailInfo;
}

class CovidScraper extends Scraper<CovidScript> {
  constructor() {
    super(`${__dirname}/scripts`);
  }

  async start() {
    const scripts = await this.loadScripts();

    scripts.forEach((script) => {
      this.appendScenario(new Scenario(script));
    });

    this.run();
  }

  async scrapping(script: Scenario<CovidScript>) {
    try {
      const { jsScript } = script;

      if (!this.scraper) throw Error("크롤러 없음");
      if (!jsScript) throw Error("스크립트 없음.");

      await this.scraper.goto(jsScript.HOMEPAGE_URL);
      await this.evaluateScript(jsScript);

      const covidNumber = await this.scraper.evaluate(
        `script.getCovidNumber()`,
      );

      await this.scraper.goto(jsScript.DETAIL_PAGE_URL);
      await this.evaluateScript(jsScript);

      const covidDetailInfo = await this.scraper.evaluate(
        "script.getCovidDetailInfo()",
      );

      if (!covidNumber) throw Error("Error!");

      // eslint-disable-next-line no-console
      console.log(`청주시 확진자 수: ${covidNumber.slice(0, -1)}`);
      // eslint-disable-next-line no-console
      console.log(covidDetailInfo);
    } catch (error) {
      throw error;
    }
  }
}

export default new CovidScraper();
