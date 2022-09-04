import { memo } from "react";

import classnames from "classnames";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import { useCafeteriaQuery } from "src/hooks/api/cafeteria";
import getCafeteriaTime from "src/page/Cafeteria/constants";

import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  day: number;
  selectedMenu: number;
};

function CafeteriaBody({ fullDate, day, selectedMenu }: Props) {
  const { data: data1 } = useCafeteriaQuery(1, fullDate);
  const { data: data2 } = useCafeteriaQuery(2, fullDate);
  const { data: data3 } = useCafeteriaQuery(3, fullDate);
  const { data: data4 } = useCafeteriaQuery(4, fullDate);
  const { data: data5 } = useCafeteriaQuery(5, fullDate);
  const { data: data6 } = useCafeteriaQuery(6, fullDate);

  const isHoliday = day === 6 || day === 0;
  const allCafeteriaData = [ data1, data2, data3, data4, data5, data6 ];
  const cafeteriaMenu = allCafeteriaData[selectedMenu - 1];

  return (
    <main
      className={classnames($.cafeteria, {
        [$["no-menu"]]: cafeteriaMenu && !cafeteriaMenu.length,
      })}
    >
      {cafeteriaMenu &&
        cafeteriaMenu.length > 0 &&
        cafeteriaMenu.map(({ content, time }) => {
          const [ mealTime, timeInfo ] = getCafeteriaTime(
            isHoliday,
            selectedMenu,
            time,
          );
          return (
            <CafeteriaMenuCard
              key={content}
              {...{ mealTime, timeInfo }}
              mealMenu={content}
            />
          );
        })}

      {cafeteriaMenu && !cafeteriaMenu.length && (
        <div className={$["go-out"]}>
          <img src={noMenu} alt="메뉴가 없습니다." width="130" height="130" />
          <span>오늘은 식단이 없어요</span>
        </div>
      )}
    </main>
  );
}

export default memo(CafeteriaBody);
