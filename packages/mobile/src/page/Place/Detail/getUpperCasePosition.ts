import { PlaceSchoolDto } from "@shared/swagger-api/generated";

type GetUpperCasePosition = (
  position: string,
) => PlaceSchoolDto["school"]["area"];

const getUpperCasePosition: GetUpperCasePosition = (position) => {
  const area =
    position === "all" ? undefined : position.split("")[0].toUpperCase();
  return area as PlaceSchoolDto["school"]["area"];
};

export default getUpperCasePosition;
