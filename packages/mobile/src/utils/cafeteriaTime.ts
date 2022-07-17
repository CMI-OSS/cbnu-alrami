import { cafeteriaTimeInfo } from "src/__mocks__";

export const cafeteriaTime = (
  cafeteriaId: number,
  timeId: number,
): string[] => {
  if (timeId === 1)
    return [ "아침", cafeteriaTimeInfo[cafeteriaId - 1].breakfastInfo ];
  if (timeId === 2)
    return [ "점심", cafeteriaTimeInfo[cafeteriaId - 1].lunchInfo ];
  return [ "저녁", cafeteriaTimeInfo[cafeteriaId - 1].dinnerInfo ];
};
