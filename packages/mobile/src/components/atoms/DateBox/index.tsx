import { Dispatch, SetStateAction, useState, useEffect } from "react";

import classNames from "classnames";
import { Dayjs } from "dayjs";
import { StyleProps } from "src/type/props";
import { DAY } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  date: Dayjs;
  today: Dayjs;
  index: number;
  month: number;
  isSchedule: boolean;
  isHoliyday: boolean;
  selectedDate: Dayjs;
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>;
} & StyleProps;

function DateBox({
  className,
  date,
  today,
  index,
  month,
  isSchedule,
  isHoliyday,
  selectedDate,
  setSelectedDate,
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
    setIsRed(isSunday || isHoliyday);
    setIsGray(currentMonth !== month);
  }, [ date, isSelected, month ]);

  useEffect(() => {
    if (selectedDate.isSame(date, "date")) {
      setIsSelected(true);
      return;
    }
    setIsSelected(false);
  }, [ selectedDate ]);

  const handleSelect = () => {
    const currentMonth = date.month();
    if (currentMonth !== month) return;
    setSelectedDate(date);
  };

  return (
    <li className={className}>
      <button
        type="button"
        className={classNames($["date-button"], {
          [$["red-date"]]: isRed,
          [$["gray-date"]]: isGray,
          [$["selected-circle"]]: !isToday && isSelected,
          [$["today-circle"]]: isToday,
        })}
        onClick={handleSelect}
        aira-label={`${date.date()}일 선택하기`}
      >
        {date.date()}
      </button>
      {isSchedule && <div className={$["schedule-dot"]}></div>}
    </li>
  );
}

export default DateBox;
