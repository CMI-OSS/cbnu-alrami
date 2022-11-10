import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";
import { SchoolAddForm } from "src/types/place";

export const placeApi = createApi({
  reducerPath: "articleApi",
  baseQuery,
  tagTypes: [],
  endpoints: (build) => {
    return {
      addPlace: build.mutation<{ code: string }, SchoolAddForm>({
        query(data) {
          return {
            url: "places/school",
            method: "post",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useAddPlaceMutation } = placeApi;
