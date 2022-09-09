import { useQueries } from "@tanstack/react-query";
import { getCafeteria } from "src/api/cafeteria";
import { queryKey } from "src/consts/react-query";

import { useCoreQuery } from "../core";

export const useCafeteriasQuery = (date: req.Cafeteria["date"]) => {
  const cafeteriaIds = [ 1, 2, 3, 4, 5, 6 ];
  return useQueries({
    queries: cafeteriaIds.map((cafeteriaId) => {
      return {
        queryKey: queryKey.cafeteria(cafeteriaId, date),
        queryFn: () => {
          return getCafeteria({ cafeteriaId, date });
        },
      };
    }),
  });
};

export const useCafeteriaQuery = (
  cafeteriaId: req.Cafeteria["cafeteriaId"],
  date: req.Cafeteria["date"],
) => {
  return useCoreQuery<res.Cafeteria[], res.Cafeteria[]>(
    queryKey.cafeteria(cafeteriaId, date),
    () => {
      return getCafeteria({ cafeteriaId, date });
    },
    { suspense: true },
  );
};
