import { ScraperType } from "@shared/types";

export const getScraperLabel = (type: ScraperType) => {
  return new Map<ScraperType, string>([
    [ "notice", "공지사항" ],
    [ "cafeteria", "학생 식당" ],
    [ "domitory", "기숙사 식당" ],
    [ "calendar", "학사일정" ],
  ]).get(type);
};
