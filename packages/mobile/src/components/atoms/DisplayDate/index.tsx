import { useMemo } from "react";

import dayjs from "dayjs";

import $ from "./style.module.scss";

type Props = {
  year: number;
  month: number;
};

function DisplayDate({ year, month }: Props) {
  const displayDate = useMemo(
    () => `${year}.${(month + 1).toString().padStart(2, "0")}`,
    [ month ],
  );

  return <span className={$["year-month"]}>{displayDate}</span>;
}

export default DisplayDate;
