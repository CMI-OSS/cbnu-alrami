import {
  CafeteriaMenu,
  CafeteriaMenuApiService,
} from "@shared/swagger-api/generated";
import { useQueries } from "@tanstack/react-query";
import { CAFETERIA_MENUS } from "src/constants";
import { queryKey } from "src/consts/react-query/queryKey";

import { useCoreQuery } from "../core";

export const useCafeteriasQuery = (date: CafeteriaMenu["date"]) => {
  return useQueries({
    queries: CAFETERIA_MENUS.map((name) => {
      return {
        queryKey: queryKey.cafeteria(name, date),
        queryFn: () => {
          return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
            name,
            date,
          });
        },
      };
    }),
  });
};

export const useCafeteriaQuery = (
  name: CafeteriaMenu["name"],
  date: CafeteriaMenu["date"],
) => {
  return useCoreQuery<CafeteriaMenu[]>(
    queryKey.cafeteria(name, date),
    () => {
      return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
        name,
        date,
      });
    },
    { suspense: true },
  );
};
