import http from "src/api/core";

export const getCafeteria = (
  params: req.Cafeteria,
): Promise<res.Cafeteria[]> => {
  return http.get(`/cafeterias/${params.cafeteriaId}/menus`, { params });
};
