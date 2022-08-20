import classNames from "classnames";
import { Dayjs } from "dayjs";
import { CAFETERIA_LIST } from "src/__mocks__";
import { useCafeteria } from "src/api/cafeteria";
import BorderBox from "src/components/atoms/BorderBox";
import { Write } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";

import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
  cafeteriaName: string;
  isHoliday: boolean;
  onClick: () => void;
  className?: string;
};

const FOOD_TIME = {
  breakfast: {
    weekday: "07:20 ~ 09:00",
    holiday: "08:00 ~ 09:00",
  },
  lunch: {
    weekday: "11:30 ~ 13:30",
    holiday: "12:00 ~ 13:00",
  },
  dinner: {
    weekday: "17:30 ~ 19:10",
    holiday: "17:30 ~ 19:10",
  },
};

const getMealType = (id: number) => {
  if (id === 1) return "아침";
  if (id === 2) return "점심";
  return "저녁";
};

const getMealPeriod = (id: number, isHoliday: boolean) => {
  if (id === 1)
    return isHoliday
      ? FOOD_TIME.breakfast.holiday
      : FOOD_TIME.breakfast.weekday;
  if (id === 2)
    return isHoliday ? FOOD_TIME.lunch.holiday : FOOD_TIME.lunch.weekday;

  return isHoliday ? FOOD_TIME.dinner.holiday : FOOD_TIME.dinner.weekday;
};

const getMealTypeIndex = (hour: number) => {
  if (hour >= 0 && hour < 10) return 0;
  if (hour >= 10 && hour < 13) return 1;
  return 2;
};

function Selected({
  today,
  cafeteriaName,
  isHoliday,
  onClick,
  className,
}: Props) {
  const allCafeteriaData = useCafeteria(today.format("YYYY-MM-DD"));
  const target = CAFETERIA_LIST.find((cafeteria) => {
    return cafeteria.name === cafeteriaName;
  });

  if (!target) return <div>식당 선택 오류</div>;

  const { data, isLoading, error } = allCafeteriaData[target!.id - 1];

  if (error) return <div>식단 로딩 에러</div>;
  if (isLoading) return <div>식단 데이터 로딩중</div>;
  if (!data) return <div>식단 정보 없음</div>;

  const menuData = data.data[getMealTypeIndex(today.hour())];

  if (!menuData) return <div>식단 정보 없음</div>;

  return (
    <BorderBox height="auto" className={classNames($["menu-box"], className)}>
      <div className={$.title}>
        <div className={$.location}>
          <span>{`${cafeteriaName} ${getMealType(menuData.time)}`}</span>
          <button
            type="button"
            aria-label="대표 식당 변경하기"
            onClick={onClick}
          >
            <Write stroke="#aaa" size={12} />
          </button>
        </div>
        <span className={$.time}>
          {getMealPeriod(menuData.time, isHoliday)}
        </span>
      </div>
      <Line />
      <div className={$["food-box"]}>
        {menuData.content ? (
          <p className={$["cafeteria-content"]}>{menuData.content}</p>
        ) : (
          <span className={$["empty-menu"]}>지금은 식단이 없어요</span>
        )}
      </div>
    </BorderBox>
  );
}

export default Selected;
