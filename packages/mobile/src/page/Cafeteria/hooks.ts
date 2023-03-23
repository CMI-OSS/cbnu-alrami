import { useNavigate } from "react-router-dom";

import { CafeteriaMenu } from "@shared/swagger-api/generated";
import useSearch from "src/hooks/useSearch";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectMenu } from "src/store/cafeteriaSlice";

import caledarReducer, { CalendarAction } from "../Calendar/calendarReducer";
import { getDateMenuInQueryStr } from "./utils";

export const useCafeteria = () => {
  const queryDate = useSearch({ target: "date" });
  const queryMenu = useSearch({ target: "menu" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedMenu } = useAppSelector((state) => {
    return state.persistedReducer.cafeteria.cafeteria;
  });

  const { year, month, date, day, menu } = getDateMenuInQueryStr(selectedMenu, {
    queryDate,
    queryMenu,
  });

  const getFullDate = (year: number, month: number, date: number) => {
    return `${year}-${month + 1}-${date}`;
  };

  const dispatchDate = (type: CalendarAction) => {
    return caledarReducer({ year, month: month - 1, date, day }, { type });
  };

  const onDecrease = () => {
    const { year, month, date } = dispatchDate("decrement_date");
    const fullDate = getFullDate(year, month, date || 1);
    navigate(`?date=${fullDate}&menu=${menu}`, { replace: true });
  };

  const onIncrease = () => {
    const { year, month, date } = dispatchDate("increment_date");
    const fullDate = getFullDate(year, month, date || 1);
    navigate(`?date=${fullDate}&menu=${menu}`, { replace: true });
  };

  const handleMenu = (selectedMenu: CafeteriaMenu.name) => {
    dispatch(selectMenu({ selectedMenu }));
    const fullDate = getFullDate(year, month - 1, date);
    navigate(`?date=${fullDate}&menu=${selectedMenu}`, { replace: true });
  };

  return {
    year,
    month: month - 1,
    date,
    day,
    fullDate: getFullDate(year, month - 1, date),
    selectedMenu: menu,
    onDecrease,
    onIncrease,
    handleMenu,
  };
};
