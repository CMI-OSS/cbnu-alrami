import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchSubscribeBoards = () => {
  return caxios.get<res.SubscriptionBoard[]>("/subscribe/boards/info");
};

export const useSubscribeBoards = () => {
  const response = useQuery<AxiosResponse<res.SubscriptionBoard[]>, Error>(
    "subscribeBoards",
    fetchSubscribeBoards,
  );
  return response;
};
