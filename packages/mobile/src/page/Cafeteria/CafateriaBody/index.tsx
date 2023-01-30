import { memo } from "react";

import {
  CafeteriaMenu,
  CafeteriaMenuApiService,
} from "@shared/swagger-api/generated";
import { useQuery } from "@tanstack/react-query";
import classnames from "classnames";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import getCafeteriaTime from "src/page/Cafeteria/constants";

import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  day: number;
  selectedMenu: number;
};

function CafeteriaBody({ fullDate, day, selectedMenu }: Props) {
  const { data: bongwan } = useQuery([ "bongwan" ], () => {
    return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
      name: CafeteriaMenu.name.BONGWAN,
      date: fullDate,
    });
  });

  const { data: byeolbit } = useQuery([ "byeolbit" ], () => {
    return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
      name: CafeteriaMenu.name.BYEOLBIT,
      date: fullDate,
    });
  });

  const { data: hanbit } = useQuery([ "hanbit" ], () => {
    return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
      name: CafeteriaMenu.name.HANBIT,
      date: fullDate,
    });
  });
  const { data: unhasu } = useQuery([ "unhasu" ], () => {
    return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
      name: CafeteriaMenu.name.UNHASU,
      date: fullDate,
    });
  });
  const { data: yangjinjae } = useQuery([ "yangjinjae" ], () => {
    return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
      name: CafeteriaMenu.name.YANGJINJAE,
      date: fullDate,
    });
  });

  const { data: yangsungjae } = useQuery([ "yangsungjae" ], () => {
    return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
      name: CafeteriaMenu.name.YANGSUNGJAE,
      date: fullDate,
    });
  });

  const isHoliday = day === 6 || day === 0;
  const allCafeteriaData = [
    bongwan,
    yangjinjae,
    yangsungjae,
    hanbit,
    byeolbit,
    unhasu,
  ];
  const cafeteriaMenu = allCafeteriaData[selectedMenu - 1];

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
