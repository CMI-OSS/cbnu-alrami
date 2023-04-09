import { animateScroll } from "react-scroll";

import { Arrow } from "@components/atoms/icon";
import guideEmptyFavoritesSchedule from "src/assets/guide_empty_favorites_schedule.svg";
import ReloadButton, {
  ReloadButtonProps,
} from "src/components/shared/ReloadButton";
import { FormattedSchedule } from "src/hooks/api/schedule";
import useScroll from "src/hooks/useScroll";
import { ScheduleType } from "src/page/Calendar";

import CollegeCard from "../CollegeCard";
import reloadCalendarQueries from "./reloadCalendarQueries";
import $ from "./style.module.scss";

const CALENDAR_UNVISIBLE_POINT = 320;

type Props = {
  bookmarkSchedules: FormattedSchedule[];
  scheduleType: ScheduleType;
  todaysSchedules: FormattedSchedule[];
};

function CardBox({ scheduleType, todaysSchedules, bookmarkSchedules }: Props) {
  const { y } = useScroll();
  const bookmarkedIDList = bookmarkSchedules.map(({ id }) => {
    return id;
  });

  const ReloadButtonForCalendar = ({
    buttonType,
  }: Pick<ReloadButtonProps, "buttonType">) => {
    return (
      <ReloadButton
        buttonType={buttonType}
        onClick={reloadCalendarQueries}
        className={$["reload-button"]}
      />
    );
  };

  if (todaysSchedules.length === 0)
    return (
      <section className={$["empty-box"]}>
        {scheduleType === "all" ? (
          <>
            <span className={$.description}>오늘은 일정이 없어요</span>
            <ReloadButtonForCalendar buttonType="text" />
          </>
        ) : (
          <div className={$["guide-image-box"]}>
            <img
              className={$.image}
              width={239}
              src={guideEmptyFavoritesSchedule}
              alt="즐겨찾기된 학사일정 없음"
            />
            <ReloadButtonForCalendar buttonType="text" />
          </div>
        )}
      </section>
    );

  return (
    <section className={$["card-box"]}>
      {todaysSchedules.map(({ id, content, startDateTime, endDateTime }) => {
        return (
          <CollegeCard
            key={id}
            isBookmarked={bookmarkedIDList.includes(id)}
            {...{ id, content, startDateTime, endDateTime }}
          />
        );
      })}
      <ReloadButtonForCalendar buttonType="icon" />
      {y > CALENDAR_UNVISIBLE_POINT && (
        <button
          className={$["floating-button"]}
          type="button"
          onClick={() => {
            return animateScroll.scrollToTop({ duration: 250 });
          }}
        >
          <Arrow size={10} stroke="#828282" />
        </button>
      )}
    </section>
  );
}

export default CardBox;
