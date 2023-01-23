import { Place, SchoolPlace } from "src/types/place";

import axios, { isAxiosError } from "../axios";
import { CMIError } from "../types";

const endpoint = "/places/school";

export type PlaceListItem = {
  id: number;
  school?: { area: SchoolPlace["area"] };
} & Omit<Place, "contact" | "description">;

interface GetPlacesApiOutput_Success {
  type: "GetPlacesApiOutput_Success";
  content: PlaceListItem[];
}

interface GetPlacesApiOutput_Error extends CMIError {
  type: "GetPlacesApiOutput_Error";
}

export type GetPlacesApiOutput =
  | GetPlacesApiOutput_Success
  | GetPlacesApiOutput_Error;

export const getPlaces = async (): Promise<GetPlacesApiOutput> => {
  let result;

  try {
    result = await axios.get(endpoint);
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        type: "GetPlacesApiOutput_Error",
        ...(error.response?.data as CMIError),
      };
    }

    return {
      type: "GetPlacesApiOutput_Error",
      error: {
        message: "알 수 없는 에러",
      },
    };
  }

  return {
    type: "GetPlacesApiOutput_Success",
    content: result?.data,
  };
};
