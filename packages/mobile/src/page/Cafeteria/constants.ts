const dormitoryWeekTime = {
  breakfastInfo: "07:20 ~ 09:00",
  lunchInfo: "11:30 ~ 13:30",
  dinnerInfo: "17:30 ~ 19:10",
};

const dormitoryHolidayInfo = {
  breakfastInfo: "08:00 ~ 09:00",
  lunchInfo: "12:00 ~ 13:00",
  dinnerInfo: "17:30 ~ 19:00",
};

const cafeteriaTimeInfo = (isHoliday: boolean) => {
  return [
    {
      id: 1,
      name: "본관",
      ...(isHoliday ? dormitoryHolidayInfo : dormitoryWeekTime),
    },
    {
      id: 2,
      name: "양성재",
      ...(isHoliday ? dormitoryHolidayInfo : dormitoryWeekTime),
    },
    {
      id: 3,
      name: "양진재",
      ...(isHoliday ? dormitoryHolidayInfo : dormitoryWeekTime),
    },
    {
      id: 4,
      name: "한빛식당",
      breakfastInfo: "10:00 ~ 13:00",
      lunchInfo: "11:00 ~ 14:00",
      dinnerInfo: "16:30 ~ 17:30",
    },
    {
      id: 5,
      name: "별빛식당",
      breakfastInfo: "09:00 ~ 11:00",
      lunchInfo: "11:30 ~ 14:00",
      dinnerInfo: "18:00 ~ 20:00",
    },
    {
      id: 6,
      name: "은하수식당",
      breakfastInfo: "09:00 ~ 11:00",
      lunchInfo: "11:30 ~ 13:30",
      dinnerInfo: "17:30 ~ 19:00",
    },
  ];
};

export const cafeteriaTime = (
  isHoliday: boolean,
  cafeteriaId: number,
  timeId: number,
): string[] => {
  const breakFastName = cafeteriaId === 4 ? "아점" : "아침";
  if (timeId === 1)
    return [
      breakFastName,
      cafeteriaTimeInfo(isHoliday)[cafeteriaId - 1].breakfastInfo,
    ];
  if (timeId === 2)
    return [ "점심", cafeteriaTimeInfo(isHoliday)[cafeteriaId - 1].lunchInfo ];
  return [ "저녁", cafeteriaTimeInfo(isHoliday)[cafeteriaId - 1].dinnerInfo ];
};

export default cafeteriaTimeInfo;
