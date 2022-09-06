import http from "src/api/core";

export const getSchools = (): Promise<res.School[]> => {
  return http.get("/places/school");
};

export const getSchool = (
  placeId: req.School["placeId"],
): Promise<res.SchoolDetail> => {
  return http.get(`/places/school/${placeId}`);
};
