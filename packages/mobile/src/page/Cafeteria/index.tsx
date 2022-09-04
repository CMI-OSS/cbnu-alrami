import { useReducer } from "react";

import dayjs from "dayjs";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import MenuList from "src/components/molecules/MenuList";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import { CAFETERIA_LIST } from "src/constants";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectMenu } from "src/store/cafeteriaSlice";

import caledarReducer from "../Calendar/calendarReducer";
import CafeteriaBody from "./CafateriaBody";
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
  const fullDate = `${year}-${month + 1}-${date}`;

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

      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height="100vh" />}
        errorFallback={ErrorFallback}
        fallBackHeight="100vh"
        keys={[ fullDate, selectedMenu ]}
      >
        <CafeteriaBody day={day || 1} {...{ fullDate, selectedMenu }} />
      </AsyncBoundary>

      <Footer />
    </>
  );
}

export default Cafeteria;
