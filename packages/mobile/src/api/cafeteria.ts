import { useQueries } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const queryOption = (date: string) => {
  return Array.from({ length: 6 }, (_, idx) => {
    return {
      queryKey: [ "cafeteria", date, idx + 1 ],
      queryFn: () => {
        return caxios.get<res.Cafeteria[]>(
          `/cafeterias/${idx + 1}/menus?${date}`,
        );
      },
    };
  });
};

export const useCafeteria = (date: string) => {
  const response = useQueries<
    {
      queryKey: (string | number)[];
      queryFn: () => Promise<AxiosResponse<res.Cafeteria[], Error>>;
    }[]
  >(queryOption(date));
  return response;
};
