import { useMemo } from "react";

import BorderBox from "@components/atoms/BorderBox";
import { Star } from "@components/atoms/icon";
import {
  useAddScheduleBookmarkMutation,
  useRemoveScheduleBookmarkMutation,
} from "@hooks/api/schedule";
import classNames from "classnames";
import { Dayjs } from "dayjs";
import { DefaultProps } from "src/type/props";
import { getDatePeriod } from "src/utils/calendarTools";

import { MOCK_UUID } from "..";
import $ from "./style.module.scss";

type Props = {
  id: number;
  content: string;
  startDateTime: Dayjs;
  endDateTime: Dayjs | null;
  isBookmarked: boolean;
} & DefaultProps;

function CollegeCard(props: Props) {
  const { id, className, content, startDateTime, endDateTime, isBookmarked } =
    props;
  const addScheduleBookmark = useAddScheduleBookmarkMutation();
  const removeScheduleBookmark = useRemoveScheduleBookmarkMutation();
  const period = useMemo(() => {
    return getDatePeriod(startDateTime, endDateTime);
  }, [ startDateTime, endDateTime ]);

  const handleStarClick = () => {
    if (isBookmarked) {
      removeScheduleBookmark.mutate({ id, uuid: MOCK_UUID });
      return;
    }
    addScheduleBookmark.mutate({ id, uuid: MOCK_UUID });
  };

  return (
    <BorderBox className={classNames(className, $.card)}>
      <em className={$.content}>{content}</em>
      <span className={$.period}>{period}</span>
      <button type="button" className={$.star} onClick={handleStarClick}>
        {isBookmarked ? (
          <Star size={20} fill="#d66d6e" stroke="#d66d6e" />
        ) : (
          <Star size={20} stroke="#5e5e5e" />
        )}
      </button>
    </BorderBox>
  );
}

export default CollegeCard;
