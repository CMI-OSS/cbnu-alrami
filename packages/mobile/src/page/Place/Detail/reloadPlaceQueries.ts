import { queryKey } from "src/consts/react-query/queryKey";
import { queryClient } from "src/main";

import getUpperCasePosition from "./getUpperCasePosition";

function reloadPlaceQueries(position: string) {
  const area = getUpperCasePosition(position);
  queryClient.resetQueries(queryKey.schools({ area }));
}

export default reloadPlaceQueries;
