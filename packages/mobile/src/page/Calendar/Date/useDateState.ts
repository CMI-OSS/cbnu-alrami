import { useEffect, useState } from "react";

import { Dayjs } from "dayjs";
import { DAY } from "src/utils/calendarTools";

type Props = {
  today: Dayjs;
  selectedDate: Dayjs;
  date: Dayjs;
  isHoliday: boolean;
  month: number;
  index: number;
};

function useDateState({
  today,
  selectedDate,
  isHoliday,
  date,
  month,
  index,
}: Props) {
  const [ isSelected, setIsSelected ] = useState(false);
  const [ isToday, setIsToday ] = useState(false);
  const [ isRed, setIsRed ] = useState(false);
  const [ isGray, setIsGray ] = useState(false);

  useEffect(() => {
    if (today.month() !== month) {
      setIsToday(false);
      return;
    }
    if (today.isSame(date, "date")) {
      setIsToday(true);
      return;
    }
    setIsToday(false);
  }, [ today, month ]);

  useEffect(() => {
    const currentMonth = date.month();
    if (isSelected || isToday) {
      setIsRed(false);
      return;
    }
    const isSunday = index % DAY.length === 0;
    setIsRed(isSunday || isHoliday);
    setIsGray(currentMonth !== month);
  }, [ date, isSelected, month ]);

  useEffect(() => {
    if (selectedDate.isSame(date, "date")) {
      setIsSelected(true);
      return;
    }
    setIsSelected(false);
  }, [ selectedDate ]);

  return { isSelected, isToday, isRed, isGray };
}

export default useDateState;
