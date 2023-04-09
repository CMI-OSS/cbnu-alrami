import {
  CafeteriaMenu,
  CafeteriaMenuApiService,
} from "@shared/swagger-api/generated";
import { useQueries } from "@tanstack/react-query";
import { CAFETERIA_MENUS } from "src/consts";
import { queryKey } from "src/consts/react-query/queryKey";

import { CustomQueryOptions, useCoreQuery } from "../core";

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

export const cafeteriaQuery = (
  name: CafeteriaMenu["name"],
  date: CafeteriaMenu["date"],
): CustomQueryOptions<CafeteriaMenu[]> => {
  return {
    queryKey: queryKey.cafeteria(name, date),
    queryFn: () => {
      return CafeteriaMenuApiService.cafeteriaMenuControllerFindAll({
        name,
        date,
      });
    },
    suspense: true,
  };
};

export const useCafeteriaQuery = (
  name: CafeteriaMenu["name"],
  date: CafeteriaMenu["date"],
) => {
  const { queryKey, queryFn, ...rest } = cafeteriaQuery(name, date);
  return useCoreQuery<CafeteriaMenu[]>(queryKey, queryFn, rest);
};
