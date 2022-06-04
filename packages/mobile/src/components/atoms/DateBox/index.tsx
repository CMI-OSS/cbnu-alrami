import { Dispatch, SetStateAction, useState, useEffect } from "react";

import classNames from "classnames";
import { StyleProps } from "src/type/props";
import { DAY, getDate, getMonth } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  date: string;
  today: string;
  index: number;
  month: number;
  isSchedule: boolean;
  isHoliyday: boolean;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
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
    if (today === date) {
      setIsToday(true);
      return;
    }
    setIsToday(false);
  }, [ today ]);

  useEffect(() => {
    const currentMonth = getMonth(date);
    if (isSelected || isToday) {
      setIsRed(false);
      return;
    }
    const isSunday = index % DAY.length === 0;
    setIsRed(isSunday || isHoliyday);
    setIsGray(currentMonth !== month);
  }, [ date, isSelected, month ]);

  useEffect(() => {
    if (selectedDate === date) {
      setIsSelected(true);
      return;
    }
    setIsSelected(false);
  }, [ selectedDate ]);

  const handleSelect = () => {
    const currentMonth = getMonth(date);
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
        aira-label={`${getDate(date)}일 선택하기`}
      >
        {getDate(date)}
      </button>
      {isSchedule && <div className={$["schedule-dot"]}></div>}
    </li>
  );
}

export default DateBox;
