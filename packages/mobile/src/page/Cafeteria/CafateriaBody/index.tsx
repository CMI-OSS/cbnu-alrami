import ReloadButton from "@components/shared/ReloadButton";
import { CafeteriaMenu } from "@shared/swagger-api/generated";
import classnames from "classnames";
import noMenu from "src/assets/no_menu.svg";
import ShareButton from "src/components/atoms/ShareButton";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import { useCafeteriaQuery } from "src/hooks/api/cafeteria";
import { queryClient } from "src/main";

import { getCafeteriaTime } from "../constants";
import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  day: number;
  selectedMenu: CafeteriaMenu["name"];
};

function CafeteriaBody({ fullDate, day, selectedMenu }: Props) {
  const isHoliday = day === 6 || day === 0;
  const { data: cafeteriaMenu } = useCafeteriaQuery(selectedMenu, fullDate);
  const isCafeteriaExist = cafeteriaMenu && cafeteriaMenu.length > 0;

  const reload = () => {
    queryClient.refetchQueries();
  };

  return (
    <main
      className={classnames($.cafeteria, {
        [$["no-menu"]]: !isCafeteriaExist,
      })}
    >
      {isCafeteriaExist && (
        <>
          {cafeteriaMenu.map(({ menu, time }) => {
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
          <div className={$["button-box"]}>
            <ShareButton
              size={20}
              stroke="#9FB0C6"
              successMsg="식단 링크가 클립보드에 복사되었습니다."
              className={$["share-button"]}
            />
            <ReloadButton
              buttonType="icon"
              onClick={reload}
              className={$["reload-button"]}
            />
          </div>
        </>
      )}

      {!isCafeteriaExist && (
        <div className={$["go-out"]}>
          <img src={noMenu} alt="메뉴가 없습니다." width="130" height="130" />
          <span className={$["go-out-text"]}>오늘은 식단이 없어요</span>
        </div>
      )}
    </main>
  );
}

export default CafeteriaBody;
