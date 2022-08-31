import { memo } from "react";

import classnames from "classnames";
import { useCafeteria } from "src/api/cafeteria";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import { cafeteriaTime } from "src/utils/cafeteriaTime";

import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  selectedMenu: number;
};

function CafeteriaBody({ fullDate, selectedMenu }: Props) {
  const { data: data1 } = useCafeteria(1, fullDate);
  const { data: data2 } = useCafeteria(2, fullDate);
  const { data: data3 } = useCafeteria(3, fullDate);
  const { data: data4 } = useCafeteria(4, fullDate);
  const { data: data5 } = useCafeteria(5, fullDate);
  const { data: data6 } = useCafeteria(6, fullDate);

  const allCafeteriaData = [ data1, data2, data3, data4, data5, data6 ];
  const data = allCafeteriaData[selectedMenu - 1];
  const cafeteriaMenu = data?.data;

  return (
    <main
      className={classnames($.cafeteria, {
        [$["no-menu"]]: cafeteriaMenu && !cafeteriaMenu.length,
      })}
    >
      {cafeteriaMenu &&
        cafeteriaMenu.length > 0 &&
        cafeteriaMenu.map(({ content, time }) => {
          const [ mealTime, timeInfo ] = cafeteriaTime(selectedMenu, time);
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
