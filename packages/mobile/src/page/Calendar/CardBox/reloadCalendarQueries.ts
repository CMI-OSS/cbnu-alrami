import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";
import refetchManyQueries from "src/utils/refetchManyQueries";

function reloadCalendarQueries() {
  refetchManyQueries({
    queryClient,
    queryKeys: [
      queryKey.schedules,
      queryKey.bookmarkSchedules
    ]
  })
}

export default reloadCalendarQueries;