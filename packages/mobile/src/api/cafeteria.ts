import { useQuery } from "react-query";

import caxios from "src/api/caxios";

let first = true;
const fetchCafeteria = async (id: number, date: string) => {
  try {
    const response = await caxios.get<res.Cafeteria[]>(
      `/cafeterias/${id}/menus?date=${date}`,
    );
    if (first) {
      // error test
      first = false;
      throw Error("오류가 발생했습니다.");
    }
    return response;
  } catch (err) {
    throw new Error("네트워크 오류");
  }
};

export const useCafeteria = (id: number, date: string) => {
  const response = useQuery(
    [ "cafeteria", date, id ],
    () => {
      return fetchCafeteria(id, date);
    },
    { suspense: true },
  );
  return response;
};
