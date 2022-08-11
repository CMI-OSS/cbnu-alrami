import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSubscribeBoards = () => {
  return caxios.get<res.SubscriptionBoard[]>("/subscribe/boards/info");
};

export const useSubscribeBoards = () => {
  const response = useQuery<
    AxiosResponse<res.SubscriptionBoard[]>,
    Error,
    res.SubscriptionBoard[]
  >("subscribeBoards", fetchSubscribeBoards, {
    select: (data) => {
      return data.data.map((category) => {
        return {
          ...category,
          name: category.parents.length
            ? `${category.parents[0].name} - ${category.name}`
            : category.name,
        };
      });
    },
  });
  return response;
};
