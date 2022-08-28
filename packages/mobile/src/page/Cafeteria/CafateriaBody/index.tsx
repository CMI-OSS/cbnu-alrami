import classnames from "classnames";
import { useCafeterias } from "src/api/cafeteria";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import { cafeteriaTime } from "src/utils/cafeteriaTime";

import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  selectedMenu: number;
};

function CafeteriaBody({ fullDate, selectedMenu }: Props) {
  const allCafeteriaData = useCafeterias(fullDate);
  const { data } = allCafeteriaData[selectedMenu - 1];
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

export default CafeteriaBody;
