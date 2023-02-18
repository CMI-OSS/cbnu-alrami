import { ScheduleApiService } from "@shared/swagger-api/generated/services/ScheduleApiService";
import schdule2023 from "src/schedule-scraper/scripts/2023";

import { scraping } from "../scraper/scraper";
import arrayToDate from "./utils";

export const scrapingSchdule = async () => {
  const schdules = await scraping({
    scenario: {
      name: "학사일정",
      url: schdule2023.url,
      waitSelector: schdule2023.waitCalendarSelector,
      jsScript: schdule2023,
      scrapFunctionName: schdule2023.getSchedules.name,
    },
  });

  for (const schdule of schdules) {
    const [ arrayDate, content ] = schdule;
    const { start_date, end_date } = arrayToDate(schdule2023.year, arrayDate);

    await ScheduleApiService.scheduleControllerCreate({
      requestBody: {
        content,
        startDateTime: start_date,
        endDateTime: end_date,
        priority: 1,
        isHoliday: false,
      },
    });
  }
};
