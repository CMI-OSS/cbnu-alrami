import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

import boardReducer from "./boardSlice";
import logger from "./loggerMiddleware";
import scraperReducer from "./scraperSlice";

export const store = configureStore({
  reducer: { scraperReducer, boardReducer },
  middleware: new MiddlewareArray().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
