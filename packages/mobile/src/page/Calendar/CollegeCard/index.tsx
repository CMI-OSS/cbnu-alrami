import { useMemo, useState } from "react";

import classNames from "classnames";
import { Dayjs } from "dayjs";
import BorderBox from "src/components/atoms/BorderBox";
import { ColorStar, EmptyStar } from "src/components/atoms/icon";
import { DefaultProps } from "src/type/props";
import { getDatePeriod } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  content: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
} & DefaultProps;

function CollegeCard({ className, content, startDate, endDate }: Props) {
  const [ isStar, setIsStar ] = useState(false);
  const period = useMemo(() => {
    return getDatePeriod(startDate, endDate);
  }, [ startDate, endDate ]);

  const handleStarClick = () => {
    return setIsStar((pre) => {
      return !pre;
    });
  };

  return (
    <BorderBox className={classNames(className, $.card)}>
      <em className={$.content}>{content}</em>
      <span className={$.period}>{period}</span>
      <button type="button" className={$.star} onClick={handleStarClick}>
        {isStar ? <ColorStar /> : <EmptyStar />}
      </button>
    </BorderBox>
  );
}

export default CollegeCard;
