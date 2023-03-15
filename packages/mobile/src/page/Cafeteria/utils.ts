import { CafeteriaMenu } from "@shared/swagger-api/generated";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CAFETERIA_MENUS } from "src/constants";

type QueryString = string | null;

type CafeteriaQueryObj = {
  queryDate: QueryString;
  queryMenu: QueryString;
};

export const getDateMenuInQueryStr = (
  selectedMenu: CafeteriaMenu.name,
  { queryDate, queryMenu }: CafeteriaQueryObj,
) => {
  dayjs.extend(customParseFormat);

  const isStrictValidDate = (queryDate: string | null): queryDate is string => {
    return dayjs(queryDate, "YYYY-M-D", true).isValid();
  };
  const isValidMenu = (menu: string | null): menu is CafeteriaMenu.name => {
    return CAFETERIA_MENUS.includes(menu || "");
  };

  const [ year, month, date ] = isStrictValidDate(queryDate)
    ? queryDate.split("-").map((v) => {
        return Number(v);
      })
    : [ dayjs().year(), dayjs().month() + 1, dayjs().date() ];
  const day = dayjs(isStrictValidDate(queryDate) ? queryDate : undefined).day();
  const menu = isValidMenu(queryMenu)
    ? queryMenu
    : selectedMenu || CafeteriaMenu.name.BONGWAN;

  return {
    year,
    month,
    date,
    day,
    menu,
  };
};
