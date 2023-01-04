import { FieldError } from "react-hook-form";

export type Place = {
  id?: number;
  type?: "school" | "restaurant";
  name: string;
  latitude: number;
  longtitude: number;
  address: string;
  contact: string;
  description?: string;
};

export type SchoolPlace = {
  buildingNumber: string;
  oldBuildingNumber: string;
  area: "E" | "S" | "N";
} & Place;

export type SchoolAddForm = {
  tags: string;
  imageIds: number[];
} & SchoolPlace;

export type SchoolAddFormErrors = {
  [key in keyof SchoolAddForm]?: key extends "boards"
    ? FieldError[] | undefined
    : FieldError | undefined;
};
