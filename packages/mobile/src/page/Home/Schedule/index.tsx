import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import BorderBox from "src/components/atoms/BorderBox";
import { LongArrow } from "src/components/atoms/icon";
import { getTimePeriod } from "src/utils/calendarTools";

import $ from "./style.module.scss";

const MAX_HEIGHT = 23 as const;

type Props = {
  content: string;
  startDateTime: string;
  endDateTime: string | undefined;
  today: Dayjs;
};

function Schedule({ content, startDateTime, endDateTime, today }: Props) {
  const navigate = useNavigate();
  const start = dayjs(startDateTime);
  const end = endDateTime ? dayjs(endDateTime) : null;
  const period = getTimePeriod(start, end, today);
  const ref = useRef<HTMLSpanElement>(null);
  const [ isLong, setIsLong ] = useState(false);

  useEffect(() => {
    const spanHeight = ref.current?.clientHeight;
    if (!spanHeight) return;
    if (spanHeight > MAX_HEIGHT) {
      setIsLong(true);
      return;
    }
    setIsLong(false);
  }, []);

  const handleCardClick = () => {
    navigate("/calendar");
  };

  return (
    <button type="button" className={$.button} onClick={handleCardClick}>
      <BorderBox width={272} height={104} className={$.container}>
        <div>
          <span
            ref={ref}
            className={classNames($["schedule-name"], {
              [$["long-schedule-name"]]: isLong,
            })}
          >
            {content}
          </span>
          <time className={$.period}>{period}</time>
        </div>
        <LongArrow size={8} stroke="#aaa" />
      </BorderBox>
    </button>
  );
}

export default Schedule;
