import { useEffect, useState } from "react";

import { getDisplayDate } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  year: number;
  month: number;
};

function DisplayDate({ year, month }: Props) {
  const [ displayDate, setDisplayDate ] = useState("");

  useEffect(() => {
    setDisplayDate(getDisplayDate(year, month));
  }, [ month ]);

  return <span className={$["year-month"]}>{displayDate}</span>;
}

export default DisplayDate;
