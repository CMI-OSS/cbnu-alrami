import { Place, SchoolPlace } from "src/types/place";

import axios, { isAxiosError } from "../axios";
import { CMIError } from "../types";

const endpoint = "/places/school";

export type PlaceItem = {
  id: number;
  type: Place["type"];
  school?: {
    id: number;
    createdAt: string;
    buildingNumber: string;
    oldBuildingNumber: string;
    area: SchoolPlace["area"];
  };
  tags?: string;
  images: ({ id: number; createdAt: string; url: string } | null)[];
} & Place;

interface GetPlaceApiOutput_Success {
  type: "GetPlaceApiOutput_Success";
  content: PlaceItem;
}

interface GetPlaceApiOutput_Error extends CMIError {
  type: "GetPlaceApiOutput_Error";
}

export type GetPlaceApiOutput =
  | GetPlaceApiOutput_Success
  | GetPlaceApiOutput_Error;

export const getPlace = async (placeId: number): Promise<GetPlaceApiOutput> => {
  let result;

  try {
    result = await axios.get(`${endpoint}/${placeId}`);
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        type: "GetPlaceApiOutput_Error",
        ...(error.response?.data as CMIError),
      };
    }

    return {
      type: "GetPlaceApiOutput_Error",
      error: {
        message: "알 수 없는 에러",
      },
    };
  }

  return {
    type: "GetPlaceApiOutput_Success",
    content: result?.data,
  };
};
