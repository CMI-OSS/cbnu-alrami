import { ScheduleApiService } from "@shared/swagger-api/generated/services/ScheduleApiService";
import { login } from "src/common/login";
import schdule2024 from "src/schedule-scraper/scripts/2024";

import { scraping } from "../scraper/scraper";
import arrayToDate from "./utils";

export const scrapingSchdule = async () => {
  await login();

  const schdules = await scraping({
    scenario: {
      name: "학사일정",
      url: schdule2024.url,
      waitSelector: schdule2024.waitCalendarSelector,
      jsScript: schdule2024,
      scrapFunctionName: schdule2024.getSchedules.name,
    },
  });

  for (const schdule of schdules) {
    const [ arrayDate, content ] = schdule;
    const { start_date, end_date } = arrayToDate(schdule2024.year, arrayDate);

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
