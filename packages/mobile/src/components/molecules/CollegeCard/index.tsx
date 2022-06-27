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
  const period = useMemo(
    () => getDatePeriod(startDate, endDate),
    [ startDate, endDate ],
  );

  return (
    <BorderBox className={classNames(className, $.card)} height="min-content">
      <em className={$.content}>{content}</em>
      <span className={$.period}>{period}</span>
      <button
        type="button"
        className={$.star}
        onClick={() => setIsStar((pre) => !pre)}
      >
        {isStar ? <ColorStar /> : <EmptyStar />}
      </button>
    </BorderBox>
  );
}

export default CollegeCard;
