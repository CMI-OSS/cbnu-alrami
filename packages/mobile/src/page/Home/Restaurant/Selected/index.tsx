import classNames from "classnames";
import { Dayjs } from "dayjs";
import { CAFETERIA_LIST } from "src/__mocks__";
import { useCafeteria } from "src/api/cafeteria";
import BorderBox from "src/components/atoms/BorderBox";
import { Write } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";
import { Restaurant } from "src/type";

import Empty from "../Empty";
import { getMealPeriod, getMealType, getMealTypeIndex } from "./cafeteriaTools";
import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
  cafeteriaName: Omit<Restaurant, "선택안함">;
  isHoliday: boolean;
  onClick: () => void;
  className?: string;
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
    return <Empty className={$["empty-box"]} {...{ cafeteriaName, onClick }} />;

  const { data, isLoading, error } = allCafeteriaData[target!.id - 1];

  if (error || isLoading || !data)
    return <Empty className={$["empty-box"]} {...{ cafeteriaName, onClick }} />;

  const menuData = data.data[getMealTypeIndex(today.hour())];

  if (!menuData)
    return <Empty className={$["empty-box"]} {...{ cafeteriaName, onClick }} />;

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
