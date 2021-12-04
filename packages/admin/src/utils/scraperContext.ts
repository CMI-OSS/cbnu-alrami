import { createContext } from "react";

export enum Scrapers {
  Notice = "학과별 공지사항",
  StudentRestaurant = "힉생 식당",
  DomitoryRestaurant = "기숙사 식당",
  CollegeSchedule = "학사일정",
}

export type ScraperContextConfig = {
  scraper: string;
  setScraper: (status: Scrapers) => void;
};

export const defaultContext: ScraperContextConfig = {
  scraper: Scrapers.Notice,

  // TODO: React Context 대체할 전역 관리 툴 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setScraper: () => {},
};

export const ScraperContext = createContext(defaultContext);
