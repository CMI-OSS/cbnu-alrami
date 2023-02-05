import http from "src/api/core";

export const getSchools = (): Promise<res.School[]> => {
  return http.get("/place/school");
};

export const getSchool = (
  placeId: req.School["placeId"],
): Promise<res.School> => {
  return http.get(`/school/${placeId}`);
};
