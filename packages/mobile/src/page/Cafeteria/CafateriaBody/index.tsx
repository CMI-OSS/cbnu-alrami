import { memo } from "react";

import { CafeteriaMenu } from "@shared/swagger-api/generated";
import classnames from "classnames";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import { useCafeteriaQuery } from "src/hooks/api/cafeteria";
import { getCafeteriaTime } from "src/page/Cafeteria/constants";

import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  day: number;
  selectedMenu: CafeteriaMenu["name"];
};

function CafeteriaBody({ fullDate, day, selectedMenu }: Props) {
  const { data: BONGWAN } = useCafeteriaQuery(
    CafeteriaMenu.name.BONGWAN,
    fullDate,
  );
  const { data: BYEOLBIT } = useCafeteriaQuery(
    CafeteriaMenu.name.BYEOLBIT,
    fullDate,
  );
  const { data: HANBIT } = useCafeteriaQuery(
    CafeteriaMenu.name.HANBIT,
    fullDate,
  );
  const { data: UNHASU } = useCafeteriaQuery(
    CafeteriaMenu.name.UNHASU,
    fullDate,
  );
  const { data: YANGJINJAE } = useCafeteriaQuery(
    CafeteriaMenu.name.YANGJINJAE,
    fullDate,
  );
  const { data: YANGSUNGJAE } = useCafeteriaQuery(
    CafeteriaMenu.name.YANGSUNGJAE,
    fullDate,
  );

  const isHoliday = day === 6 || day === 0;
  const allCafeteriaData = {
    BONGWAN,
    YANGJINJAE,
    YANGSUNGJAE,
    HANBIT,
    BYEOLBIT,
    UNHASU,
  };
  const cafeteriaMenu = allCafeteriaData[selectedMenu];

  return (
    <main
      className={classnames($.cafeteria, {
        [$["no-menu"]]: cafeteriaMenu && !cafeteriaMenu.length,
      })}
    >
      {cafeteriaMenu &&
        cafeteriaMenu.length > 0 &&
        cafeteriaMenu.map(({ menu, time }) => {
          const [ mealTime, timeInfo ] = getCafeteriaTime(
            isHoliday,
            selectedMenu,
            time,
          );
          return (
            <CafeteriaMenuCard
              key={menu}
              {...{ mealTime, timeInfo }}
              mealMenu={menu}
            />
          );
        })}

      {cafeteriaMenu && !cafeteriaMenu.length && (
        <div className={$["go-out"]}>
          <img src={noMenu} alt="메뉴가 없습니다." width="130" height="130" />
          <span className={$["go-out-text"]}>오늘은 식단이 없어요</span>
        </div>
      )}
    </main>
  );
}

export default memo(CafeteriaBody);
