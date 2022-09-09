import http from "src/api/core";

export const getCafeteria = async (
  params: req.Cafeteria,
): Promise<res.Cafeteria[]> => {
  try {
    const response = await http.get(
      `/cafeterias/${params.cafeteriaId}/menus?date=${params.date}`,
    );
    return response;
  } catch (err) {
    throw new Error("네트워크 오류가 발생했습니다.<br>다시 시도해주세요.");
  }
};
