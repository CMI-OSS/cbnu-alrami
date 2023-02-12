import { CafeteriaMenu } from "@shared/swagger-api/generated/models/CafeteriaMenu";
import { CafeteriaMenuApiService } from "@shared/swagger-api/generated/services/CafeteriaMenuApiService";

import { scraping } from "../scraper/scraper";
import { cafeteriaScenarios } from "./cafeteria-scenario";

const toCafeteriaTime = (time: number) => {
  if (time === 1) return CafeteriaMenu.time.BREAKFAST;
  if (time === 2) return CafeteriaMenu.time.LUNCH;
  if (time === 3) return CafeteriaMenu.time.DINNER;

  throw new Error(`[toCafeteriaTime] 존재하지 않은 시간: ${time} `);
};

export const scrapingCafeterias = async () => {
  for (const scenario of cafeteriaScenarios) {
    const result = await scraping({ scenario });

    for (const data of result) {
      await CafeteriaMenuApiService.cafeteriaMenuControllerCreate({
        requestBody: {
          time: toCafeteriaTime(data.time),
          name: scenario.name as CafeteriaMenu.name,
          menu: data.menu,
          date: data.date,
        },
      });
    }
  }
};
