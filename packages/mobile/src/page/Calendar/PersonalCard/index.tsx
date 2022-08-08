import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import { Dayjs } from "dayjs";
import BorderBox from "src/components/atoms/BorderBox";
import { Write } from "src/components/atoms/icon";
import { DefaultProps } from "src/type/props";
import { getTimePeriod } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  content: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
  selectedDate: Dayjs;
} & DefaultProps;

function PersonalCard({
  className,
  content,
  startDate,
  endDate,
  selectedDate,
}: Props) {
  const period = useMemo(() => {
    return getTimePeriod(startDate, endDate, selectedDate);
  }, [ startDate, endDate, selectedDate ]);

  return (
    <BorderBox className={classNames(className, $.card)}>
      <em className={$.content}>{content}</em>
      <span className={$.period}>{period}</span>
      <NavLink to="" className={$.link}>
        <Write size={16} stroke="#aaa" />
      </NavLink>
    </BorderBox>
  );
}

export default PersonalCard;
