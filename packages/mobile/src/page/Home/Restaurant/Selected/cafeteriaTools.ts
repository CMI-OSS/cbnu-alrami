const FOOD_TIME = {
  breakfast: {
    weekday: "07:20 ~ 09:00",
    holiday: "08:00 ~ 09:00",
  },
  lunch: {
    weekday: "11:30 ~ 13:30",
    holiday: "12:00 ~ 13:00",
  },
  dinner: {
    weekday: "17:30 ~ 19:10",
    holiday: "17:30 ~ 19:10",
  },
};

export const getMealType = (id: number) => {
  if (id === 1) return "아침";
  if (id === 2) return "점심";
  return "저녁";
};

export const getMealPeriod = (id: number, isHoliday: boolean) => {
  if (id === 1)
    return isHoliday
      ? FOOD_TIME.breakfast.holiday
      : FOOD_TIME.breakfast.weekday;
  if (id === 2)
    return isHoliday ? FOOD_TIME.lunch.holiday : FOOD_TIME.lunch.weekday;

  return isHoliday ? FOOD_TIME.dinner.holiday : FOOD_TIME.dinner.weekday;
};

export const getMealTypeIndex = (hour: number) => {
  if (hour >= 0 && hour < 10) return 0;
  if (hour >= 10 && hour < 13) return 1;
  return 2;
};
