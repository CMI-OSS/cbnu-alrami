import classNames from "classnames";
import { Dayjs } from "dayjs";
import { useCafeteria } from "src/api/cafeteria";
import BorderBox from "src/components/atoms/BorderBox";
import { Write } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";
import { CAFETERIA_LIST } from "src/constants";
import getCafeteriaTime from "src/page/Cafeteria/constants";
import { Restaurant } from "src/type";

import EmptyCafeteria from "../EmptyCafeteria";
import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
  cafeteriaName: Omit<Restaurant, "선택안함">;
  isHoliday: boolean;
  onClick: () => void;
  className?: string;
};

const getMealTimeIndex = (hour: number) => {
  if (hour >= 0 && hour < 10) return 1;
  if (hour >= 10 && hour < 13) return 2;
  return 3;
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

  if (!target)
    return (
      <EmptyCafeteria
        className={$["empty-box"]}
        {...{ cafeteriaName, onClick }}
      />
    );

  const { data, isLoading, error } = allCafeteriaData[target.id - 1];
  const menuData = data?.data.find(({ time }) => {
    return time === getMealTimeIndex(today.hour());
  });

  if (error || isLoading || !menuData)
    return (
      <EmptyCafeteria
        className={$["empty-box"]}
        {...{ cafeteriaName, onClick }}
      />
    );

  const [ mealType, mealPeriod ] = getCafeteriaTime(
    isHoliday,
    target.id,
    menuData.time,
  );

  return (
    <BorderBox height="auto" className={classNames($["menu-box"], className)}>
      <div className={$.title}>
        <div className={$.location}>
          <span>{`${cafeteriaName} ${mealType}`}</span>
          <button
            type="button"
            aria-label="대표 식당 변경하기"
            onClick={onClick}
          >
            <Write stroke="#aaa" size={12} />
          </button>
        </div>
        <span className={$.time}>{mealPeriod}</span>
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
