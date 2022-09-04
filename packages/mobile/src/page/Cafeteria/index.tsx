import { useReducer } from "react";

import classnames from "classnames";
import dayjs from "dayjs";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import MenuList from "src/components/molecules/MenuList";
import { CAFETERIA_LIST } from "src/constants";
import { useCafeteriasQuery } from "src/hooks/api/cafeteria";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectMenu } from "src/store/cafeteriaSlice";

import caledarReducer from "../Calendar/calendarReducer";
import getCafeteriaTime from "./constants";
import $ from "./style.module.scss";

function Cafeteria() {
  const today = dayjs();
  const [ { year, month, date, day }, dispatchDay ] = useReducer(caledarReducer, {
    year: today.year(),
    month: today.month(),
    date: today.date(),
    day: today.day(),
  });
  const dispatch = useAppDispatch();
  const { selectedMenu } = useAppSelector((state) => {
    return state.persistedReducer.cafeteria.cafeteria;
  });
  const handleMenu = (id: number) => {
    dispatch(selectMenu({ selectedMenu: id }));
  };
  const allCafeteriaData = useCafeteriasQuery(`${year}-${month + 1}-${date}`);
  const isHoliday = day === 6 || day === 0;
  const {
    isLoading,
    data: cafeteriaMenuData,
    error,
  } = allCafeteriaData[selectedMenu - 1];
  if (!cafeteriaMenuData || isLoading || error) return <></>;

  return (
    <>
      <header className={$.header}>
        <CalendarHeader
          calendar={{ ...{ year, month, date, day } }}
          onDecrease={() => {
            return dispatchDay({ type: "decrement_date" });
          }}
          onIncrease={() => {
            return dispatchDay({ type: "increment_date" });
          }}
        />
      </header>
      <MenuList
        menuList={CAFETERIA_LIST}
        onClick={handleMenu}
        clickedMenu={selectedMenu}
      />
      <main
        className={classnames($.cafeteria, {
          [$["no-menu"]]: cafeteriaMenuData && !cafeteriaMenuData.length,
        })}
      >
        {cafeteriaMenuData?.map(({ content, time }) => {
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
        {cafeteriaMenuData.length === 0 && (
          <div className={$["go-out"]}>
            <img src={noMenu} alt="메뉴가 없습니다." width="130" height="130" />
            <span>오늘은 식단이 없어요</span>
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Cafeteria;
