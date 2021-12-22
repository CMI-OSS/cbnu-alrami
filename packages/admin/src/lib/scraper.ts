import { ScraperType } from "@shared/types";

export const getScraperLabel = (type: ScraperType) => {
  return new Map<ScraperType, string>([
    [ "notice", "공지사항" ],
    [ "studentCafeteria", "학생 식당" ],
    [ "domitoryCafeteria", "기숙사 식당" ],
    [ "collegeSchedule", "학사일정" ],
  ]).get(type);
};
