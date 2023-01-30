import { CafeteriaMenu } from "@shared/swagger-api/generated";

const dormitoryWeekTime = {
  breakfast: "07:20 ~ 09:00",
  lunch: "11:30 ~ 13:30",
  dinner: "17:30 ~ 19:10",
};

const dormitoryHolidayTime = {
  breakfast: "08:00 ~ 09:00",
  lunch: "12:00 ~ 13:00",
  dinner: "17:30 ~ 19:00",
};

const cafeteriaTimeData = (isHoliday: boolean) => {
  const time = isHoliday ? dormitoryHolidayTime : dormitoryWeekTime;
  return [
    {
      id: 1,
      name: "본관",
      ...time,
    },
    {
      id: 2,
      name: "양진재",
      ...time,
    },
    {
      id: 3,
      name: "양성재",
      ...time,
    },
    {
      id: 4,
      name: "한빛식당",
      breakfast: "10:00 ~ 13:00",
      lunch: "11:00 ~ 14:00",
      dinner: "16:30 ~ 17:30",
    },
    {
      id: 5,
      name: "별빛식당",
      breakfast: "09:00 ~ 11:00",
      lunch: "11:30 ~ 14:00",
      dinner: "18:00 ~ 20:00",
    },
    {
      id: 6,
      name: "은하수식당",
      breakfast: "09:00 ~ 11:00",
      lunch: "11:30 ~ 13:30",
      dinner: "17:30 ~ 19:00",
    },
  ];
};

export const getCafeteriaTime = (
  isHoliday: boolean,
  cafeteriaId: number,
  time: CafeteriaMenu.time,
): string[] => {
  const breakFastName = cafeteriaId === 4 ? "아점" : "아침";
  if (time === CafeteriaMenu.time.BREAKFAST)
    return [
      breakFastName,
      cafeteriaTimeData(isHoliday)[cafeteriaId - 1].breakfast,
    ];
  if (time === CafeteriaMenu.time.LUNCH)
    return [ "점심", cafeteriaTimeData(isHoliday)[cafeteriaId - 1].lunch ];
  return [ "저녁", cafeteriaTimeData(isHoliday)[cafeteriaId - 1].dinner ];
};

export default getCafeteriaTime;
