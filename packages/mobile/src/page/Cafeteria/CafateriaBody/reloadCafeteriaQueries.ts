import { CafeteriaMenu } from "@shared/swagger-api/generated";
import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";

type Props = {
  selectedMenu: CafeteriaMenu["name"];
  fullDate: string;
};

function reloadCafeteriaQueries({ selectedMenu, fullDate }: Props) {
  queryClient.resetQueries({
    queryKey: queryKey.cafeteria(selectedMenu, fullDate),
  });
}

export default reloadCafeteriaQueries;
