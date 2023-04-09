import dayjs from "dayjs";
import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";
import getCafeteriaData from "src/utils/getCafeteriaData";
import refetchManyQueries from "src/utils/refetchManyQueries";
import { getSelectedCafeteria } from "src/utils/storage";

function reloadHomeQueries() {
  const today = dayjs().format("YYYY-MM-DD");
  const selectedCafeteriaName = getSelectedCafeteria();
  const cafeteriaID = getCafeteriaData(selectedCafeteriaName)?.id || "";

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
