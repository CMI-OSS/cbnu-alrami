/* eslint-disable no-plusplus */
/* eslint-disable no-useless-catch */
import Scraper from "../Scraper";
import { Scenario } from "../Scenario";

interface CovidDetailInfo {
  typeOfPlace: string;
  restrictionTime: number;
  restrictionLiftTime: number;
  additionalInfo: string | null;
}

interface CovidScript {
  HOMEPAGE_URL: string;
  DETAIL_PAGE_URL: string;
  getCovidNumber: () => string;
  getCovidDetailInfo: () => Array<CovidDetailInfo>;
}

interface RawStringInfo {
  bar: string;
  karaoke: string;
  gym: string;
  restaurantAndCafe: string;
  PCRoom: string;
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

      const rawStringInfo: RawStringInfo = await this.scraper.evaluate(
        "script.getCovidDetailInfo()",
      );

      const covidDetailInfoList: Array<CovidDetailInfo> = [];

      Object.entries(rawStringInfo).forEach(([ key, value ]) => {
        const resultsOfTimeInfo = value.match(
          /(?<start>[0-9]{2}).*(?<end>[0-9]){2}/,
        );
        const resultsOfAdditionalInfo = value.match(/※(?<main>.*)/);

        const covidDetailInfo = {
          typeOfPlace: key,
          restrictionTime: parseInt(resultsOfTimeInfo.groups.start, 10),
          restrictionLiftTime: parseInt(resultsOfTimeInfo.groups.end, 10),
          additionalInfo: resultsOfAdditionalInfo
            ? resultsOfAdditionalInfo.groups.main.trim()
            : null,
        };

        covidDetailInfoList.push(covidDetailInfo);
      });

      if (!covidNumber) throw Error("Error!");
      if (!covidDetailInfoList) throw Error("Error!");

      // eslint-disable-next-line no-console
      console.log(`청주시 확진자 수: ${covidNumber.slice(0, -1)}`);
      // eslint-disable-next-line no-console
      console.log(covidDetailInfoList);
    } catch (error) {
      throw error;
    }
  }
}

export default new CovidScraper();
