import { GetPlaceApiOutput_Success } from "src/newApi/placeApi/getPlace";
import { SchoolPlace } from "src/types/place";

import { ArticleWriteProps } from "../BoardPage/ArticleWrite/ArticleWrite.store";

export type RefinedSchoolState = SchoolPlace & {
  images: ArticleWriteProps["images"];
};

export const dataToSchoolFormState = (
  data: GetPlaceApiOutput_Success["content"],
): RefinedSchoolState => {
  return {
    id: data.id,
    name: data.name,
    latitude: data.latitude,
    longtitude: data.longtitude,
    address: data.address,
    contact: data.contact,
    description: data.description,
    buildingNumber: data.school?.buildingNumber || "",
    oldBuildingNumber: data.school?.oldBuildingNumber || "",
    area: data.school?.area || "E",
    images: data.images?.map(({ id, url }) => ({ id, url })) || [],
  };
};
