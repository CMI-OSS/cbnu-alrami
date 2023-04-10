import ReloadButton, {
  ReloadButtonProps,
} from "@components/shared/ReloadButton";
import { CafeteriaMenu } from "@shared/swagger-api/generated";
import classnames from "classnames";
import noMenu from "src/assets/no_menu.svg";
import ShareButton from "src/components/atoms/ShareButton";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import { cafeteriaQuery, useCafeteriaQuery } from "src/hooks/api/cafeteria";
import { holidayQuery, useHoliday } from "src/hooks/api/schedule";
import { queryClient } from "src/main";
import { isDesktop } from "src/utils/webview";

import { getCafeteriaTime } from "../constants";
import reloadCafeteriaQueries from "./reloadCafeteriaQueries";
import $ from "./style.module.scss";

type Props = {
  fullDate: string;
  selectedMenu: CafeteriaMenu["name"];
};

function CafeteriaBody({ fullDate, selectedMenu }: Props) {
  queryClient.prefetchQuery(holidayQuery(fullDate));
  queryClient.prefetchQuery(cafeteriaQuery(selectedMenu, fullDate));
  const { data: cafeteriaMenu } = useCafeteriaQuery(selectedMenu, fullDate);
  const { data: isHoliday } = useHoliday(fullDate);

  if (isHoliday === undefined || !cafeteriaMenu) return null;
  const isCafeteriaExist = cafeteriaMenu.length > 0;

  const handleReloadClick = () => {
    return reloadCafeteriaQueries({ selectedMenu, fullDate });
  };

  const ReloadButtonForCafeteria = ({
    buttonType,
  }: Pick<ReloadButtonProps, "buttonType">) => {
    return (
      <ReloadButton
        buttonType={buttonType}
        onClick={handleReloadClick}
        className={$["reload-button"]}
      />
    );
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
              successMsg={
                isDesktop
                  ? "식단 링크가 복사되었습니다."
                  : "식단 링크가 클립보드에 복사되었습니다."
              }
              className={$["share-button"]}
            />
            <ReloadButtonForCafeteria buttonType="icon" />
          </div>
        </>
      )}

      {!isCafeteriaExist && (
        <div className={$["go-out"]}>
          <img src={noMenu} alt="메뉴가 없습니다." width="130" height="130" />
          <span className={$["go-out-text"]}>오늘은 식단이 없어요</span>
          <ReloadButtonForCafeteria buttonType="text" />
        </div>
      )}
    </main>
  );
}

export default CafeteriaBody;
