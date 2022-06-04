import AddScheduleLink from "src/components/atoms/AddScheduleLink";
import ArrowButton from "src/components/atoms/ArrowButton";
import DisplayDate from "src/components/atoms/DisplayDate";

import $ from "./style.module.scss";

type Props = {
  year: number;
  month: number;
  onMonthDecrease: () => void;
  onMonthIncrease: () => void;
};

function CalendarHeader({
  year,
  month,
  onMonthDecrease,
  onMonthIncrease,
}: Props) {
  return (
    <header className={$.header}>
      <div className={$.container}>
        <ArrowButton direction="left" onClick={onMonthDecrease} />
        <DisplayDate {...{ year, month }} />
        <ArrowButton direction="right" onClick={onMonthIncrease} />
      </div>
      <AddScheduleLink className={$["add-link"]} />
    </header>
  );
}

export default CalendarHeader;
