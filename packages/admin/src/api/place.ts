import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "src/api/baseQuery";
import { Place, SchoolAddForm } from "src/types/place";

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
      editPlace: build.mutation<{ code: string }, SchoolAddForm>({
        query(data) {
          return {
            url: `places/school/${data.id}`,
            method: "put",
            body: data,
          };
        },
      }),
      deletePlace: build.mutation<{ code: string }, Pick<Place, "id">>({
        query(data) {
          return {
            url: `places/school/${data.id}`,
            method: "delete",
          };
        },
      }),
    };
  },
});

export const {
  useAddPlaceMutation,
  useEditPlaceMutation,
  useDeletePlaceMutation,
} = placeApi;
