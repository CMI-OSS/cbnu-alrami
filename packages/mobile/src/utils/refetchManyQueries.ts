import { QueryClient } from "@tanstack/react-query";

type Props = {
  queryClient: QueryClient;
  queryKeys: string[][];
};

function refetchManyQueries({ queryClient, queryKeys }: Props) {
  queryKeys.forEach((key) => {
    return queryClient.resetQueries(key);
  });
}

export default refetchManyQueries;
