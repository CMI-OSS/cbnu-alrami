import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { boardWriteApi } from "src/api/board";

import boardReducer from "./boardSlice";
import logger from "./loggerMiddleware";
import scraperReducer from "./scraperSlice";

export const store = configureStore({
  reducer: {
    scraperReducer,
    boardReducer,
    [boardWriteApi.reducerPath]: boardWriteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(boardWriteApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
