import { Dispatch, useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

function useSelectedDate(
  today: Dayjs,
  year: number,
  month: number,
): [Dayjs, Dispatch<Dayjs>] {
  const [ selectedDate, setSelectedDate ] = useState(today);

  useEffect(() => {
    if (today.month() === month) {
      setSelectedDate(today);
      return;
    }
    const firstDateOfMonth = dayjs(`${year}-${month + 1}-01`);
    setSelectedDate(firstDateOfMonth);
  }, [ month ]);

  return [ selectedDate, setSelectedDate ];
}

export default useSelectedDate;
