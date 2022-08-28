import { useQuery } from "react-query";

import caxios from "src/api/caxios";

const fetchCafeteria = async (id: number, date: string) => {
  try {
    const response = await caxios.get<res.Cafeteria[]>(
      `/cafeterias/${id}/menus?date=${date}`,
    );
    return response;
  } catch (err) {
    throw new Error("네트워크 오류");
  }
};

export const useCafeteria = (id: number, date: string) => {
  const response = useQuery([ "cafeteria", date, id ], () => {
    return fetchCafeteria(id, date);
  });
  return response;
};

export const useCafeterias = (date: string) => {
  return [ 1, 2, 3, 4, 5, 6 ].map((id) => {
    return useQuery(
      [ "cafeteria", date, id ],
      () => {
        return fetchCafeteria(id, date);
      },
      { suspense: true },
    );
  });
};
