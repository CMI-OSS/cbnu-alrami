import { useReducer } from "react";

import classnames from "classnames";
import dayjs from "dayjs";
import { cafeteriaList } from "src/__mocks__";
import { useCafeteria } from "src/api/cafeteria";
import noMenu from "src/assets/no_menu.png";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import MenuList from "src/components/molecules/MenuList";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectMenu } from "src/store/cafeteriaSlice";
import { cafeteriaTime } from "src/utils/cafeteriaTime";

import caledarReducer from "../Calendar/calendarReducer";
import $ from "./style.module.scss";

function Cafeteria() {
  const [ { year, month, date, day }, dispatchDay ] = useReducer(caledarReducer, {
    year: dayjs().year(),
    month: dayjs().month(),
    date: dayjs().date(),
    day: dayjs().day(),
  });

  const dispatch = useAppDispatch();
  const { selectedMenu } = useAppSelector((state) => {
    return state.persistedReducer.cafeteria.cafeteria;
  });
  const handleMenu = (id: number) => {
    dispatch(selectMenu({ selectedMenu: id }));
  };
  const allCafeteriaData = useCafeteria(`${year}-${month + 1}-${date}`);
  const { isLoading, data, isError } = allCafeteriaData[selectedMenu - 1];
  const cafeteriaMenu: res.Cafeteria[] | undefined = data?.data;

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
        menuList={cafeteriaList}
        onClick={handleMenu}
        clickedMenu={selectedMenu}
      />

      <main
        className={classnames($.cafeteria, {
          [$["no-menu"]]: cafeteriaMenu && !cafeteriaMenu.length,
        })}
      >
        {isLoading && <span>로딩 중..</span>}
        {isError && <span>에러 발생</span>}

        {cafeteriaMenu && cafeteriaMenu.length > 0 ? (
          <>
            {cafeteriaMenu.map(({ id, content, time }) => {
              const [ mealTime, timeInfo ] = cafeteriaTime(id, time);
              return (
                <CafeteriaMenuCard
                  key={content}
                  {...{ mealTime, timeInfo }}
                  mealMenu={content}
                />
              );
            })}
          </>
        ) : (
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
