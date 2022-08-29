import { useMemo } from "react";

import classNames from "classnames";
import { Dayjs } from "dayjs";
import {
  useAddScheduleBookmark,
  useRemoveScheduleBookmark,
} from "src/api/bookmark";
import BorderBox from "src/components/atoms/BorderBox";
import { Star } from "src/components/atoms/icon";
import { DefaultProps } from "src/type/props";
import { getDatePeriod } from "src/utils/calendarTools";

import $ from "./style.module.scss";

type Props = {
  id: number;
  content: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
  isBookmarked: boolean;
} & DefaultProps;

function CollegeCard(props: Props) {
  const { id, className, content, startDate, endDate, isBookmarked } = props;
  const addScheduleBookmark = useAddScheduleBookmark();
  const removeScheduleBookmark = useRemoveScheduleBookmark();
  const period = useMemo(() => {
    return getDatePeriod(startDate, endDate);
  }, [ startDate, endDate ]);

  const handleStarClick = () => {
    if (isBookmarked) {
      removeScheduleBookmark.mutate({ scheduleId: id });
      return;
    }
    addScheduleBookmark.mutate({ scheduleId: id });
  };

  return (
    <BorderBox className={classNames(className, $.card)}>
      <em className={$.content}>{content}</em>
      <span className={$.period}>{period}</span>
      <button type="button" className={$.star} onClick={handleStarClick}>
        {isBookmarked ? (
          <Star size={20} fill="#d66d6e" stroke="#d66d6e" />
        ) : (
          <Star size={20} stroke="#c3c3c3" />
        )}
      </button>
    </BorderBox>
  );
}

export default CollegeCard;
