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
  isHoliday: boolean;
} & StyleProps;

function Date({ className, date, today, index, month, isHoliday }: Props) {
  const { isSelected, isToday, isRed, isGray } = useDateState({
    today,
    date,
    isHoliday,
    month,
    index,
  });

  return (
    <li className={classNames(className, $.container)}>
      <div
        className={classNames($["date-button"], {
          [$["red-date"]]: isRed,
          [$["gray-date"]]: isGray,
          [$["selected-circle"]]: !isToday && isSelected,
          [$["today-circle"]]: isToday,
        })}
      >
        {date.date()}
      </div>
    </li>
  );
}

export default Date;
