import { useEffect, useState } from "react";

import classNames from "classnames";
import { StyleProps } from "src/type/props";
import { DAY } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  day: typeof DAY[number];
} & StyleProps;

function Day({ className, day }: Props) {
  const [ isRed, setIsRed ] = useState(false);

  useEffect(() => {
    const isFirstDay = day === DAY[0];
    setIsRed(isFirstDay);
  }, [ day ]);

  return (
    <li
      className={classNames(className, {
        [$["red-date"]]: isRed,
      })}
      key={day}
    >
      {day}
    </li>
  );
}

export default Day;
