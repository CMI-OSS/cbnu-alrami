import { CafeteriaMenu } from "@shared/swagger-api/generated";
import { Restaurant } from "src/type";

type CafeteriaTimeData = {
  [key in CafeteriaMenu.name]: {
    id: number;
    name: Omit<Restaurant, "표시 안함">;
    breakfast: string;
    lunch: string;
    dinner: string;
  };
};

const WEEK = "(평일)";
const HOLIDAY = "(휴일)";

const dormitoryWeekTime = {
  breakfast: `${WEEK} 07:20 ~ 09:00`,
  lunch: `${WEEK} 11:30 ~ 13:30`,
  dinner: `${WEEK} 17:30 ~ 19:10`,
};

const dormitoryHolidayTime = {
  breakfast: `${HOLIDAY} 08:00 ~ 09:00`,
  lunch: `${HOLIDAY} 12:00 ~ 13:00`,
  dinner: `${HOLIDAY} 17:30 ~ 19:00`,
};

const cafeteriaTimeData = (isHoliday: boolean): CafeteriaTimeData => {
  const time = isHoliday ? dormitoryHolidayTime : dormitoryWeekTime;
  return {
    BONGWAN: {
      id: 1,
      name: "본관",
      ...time,
    },
    YANGJINJAE: {
      id: 2,
      name: "양진재",
      ...time,
    },
    YANGSUNGJAE: {
      id: 3,
      name: "양성재",
      ...time,
    },
    HANBIT: {
      id: 4,
      name: "한빛식당",
      breakfast: "10:00 ~ 13:00",
      lunch: "11:00 ~ 14:00",
      dinner: "16:30 ~ 17:30",
    },
    BYEOLBIT: {
      id: 5,
      name: "별빛식당",
      breakfast: "09:00 ~ 11:00",
      lunch: "11:30 ~ 14:00",
      dinner: "18:00 ~ 20:00",
    },
    UNHASU: {
      id: 6,
      name: "은하수식당",
      breakfast: "09:00 ~ 11:00",
      lunch: "11:30 ~ 13:30",
      dinner: "17:30 ~ 19:00",
    },
  };
};

export const getCafeteriaTime = (
  isHoliday: boolean,
  name: CafeteriaMenu.name,
  time: CafeteriaMenu.time,
): string[] => {
  const breakFastName = name === CafeteriaMenu.name.HANBIT ? "아점" : "아침";
  if (time === CafeteriaMenu.time.BREAKFAST)
    return [ breakFastName, cafeteriaTimeData(isHoliday)[name].breakfast ];
  if (time === CafeteriaMenu.time.LUNCH)
    return [ "점심", cafeteriaTimeData(isHoliday)[name].lunch ];
  return [ "저녁", cafeteriaTimeData(isHoliday)[name].dinner ];
};
