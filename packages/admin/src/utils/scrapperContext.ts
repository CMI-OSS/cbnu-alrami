import { createContext } from "react";

export enum ScrapperConfig {
  notice = "학과별 공지사항",
  studentRestaurant = "힉생 식당",
  domitoryRestaurant = "기숙사 식당",
  collegeSchedule = "학사일정",
}

export type ScrapperContextConfig = {
  scrapper: string;
  setScrapper: (status: ScrapperConfig) => void;
};

export const defaultContext: ScrapperContextConfig = {
  scrapper: ScrapperConfig.notice,

  // TODO: React Context 대체할 전역 관리 툴 적용하기
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setScrapper: () => {},
};

export const ScrapperContext = createContext(defaultContext);
