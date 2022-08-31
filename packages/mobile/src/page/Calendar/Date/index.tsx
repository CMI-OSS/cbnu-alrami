import { Dispatch } from "react";

import classNames from "classnames";
import { Dayjs } from "dayjs";
import { StyleProps } from "src/type/props";

import $ from "./style.module.scss";
import useDateState from "./useDateState";

type Props = {
  date: Dayjs;
  today: Dayjs;
  index: number;
  month: number;
  isSchedule: boolean;
  isHoliday: boolean;
  selectedDate: Dayjs;
  setSelectedDate: Dispatch<Dayjs>;
} & StyleProps;

function Date({
  className,
  date,
  today,
  index,
  month,
  isSchedule,
  isHoliday,
  selectedDate,
  setSelectedDate,
}: Props) {
  const { isSelected, isToday, isRed, isGray } = useDateState({
    today,
    selectedDate,
    date,
    isHoliday,
    month,
    index,
  });

  const handleSelect = () => {
    const currentMonth = date.month();
    if (currentMonth !== month) return;
    setSelectedDate(date);
  };

  return (
    <li className={classNames(className, $.container)}>
      <button
        type="button"
        className={classNames($["date-button"], {
          [$["red-date"]]: isRed,
          [$["gray-date"]]: isGray,
          [$["selected-circle"]]: !isToday && isSelected,
          [$["today-circle"]]: isToday,
        })}
        onClick={handleSelect}
        aria-label={`${date.date()}일 선택하기`}
      >
        {date.date()}
      </button>
      {isSchedule && <div className={$["schedule-dot"]} />}
    </li>
  );
}

export default Date;
