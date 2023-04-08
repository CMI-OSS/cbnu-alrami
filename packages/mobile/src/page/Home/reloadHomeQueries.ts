import dayjs from "dayjs";
import { CAFETERIA_LIST } from "src/consts";
import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";
import refetchManyQueries from "src/utils/refetchManyQueries";
import { getSelectedCafeteria } from "src/utils/storage";

function reloadHomeQueries() {
  const today = dayjs().format("YYYY-MM-DD");
  const selectedCafeteriaName = getSelectedCafeteria();
  const cafeteriaID =
    CAFETERIA_LIST.find((cafeteria) => {
      return cafeteria.name === selectedCafeteriaName;
    })?.id || "";

  refetchManyQueries({
    queryClient,
    queryKeys: [
      queryKey.todaysSchedules,
      queryKey.weathers,
      queryKey.cafeteria(cafeteriaID, today),
      queryKey.popularArticles(),
    ],
  });
}

export default reloadHomeQueries;
