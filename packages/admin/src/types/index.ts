import { FieldError } from "react-hook-form";

import { ScenarioStateType } from "@shared/types";

export type ScenarioFilterType = "all" | ScenarioStateType;

export type ScenarioTurnType = "prev" | "current" | "next";

export type ScenarioQueueType = {
  id: number;
  title: string;
  turn: ScenarioTurnType;
};

export type BoardCategoryType = {
  id: number;
  name: string;
};

export type AdminJoinFormInputs = {
  id: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  authority: string;
  boards: string[];
};

export type AdminJoinFormErrors = {
  [key in keyof AdminJoinFormInputs]?: key extends "boards"
    ? FieldError[] | undefined
    : FieldError | undefined;
};

export type imgType = {
  id: number;
  url: string;
};

export interface ContentPage<T> {
  pagination: {
    isEnd: boolean;
    pageNumber: number;
    totalItemCount: number;
    totalPageCount: number;
  };
  contents: T[];
}
