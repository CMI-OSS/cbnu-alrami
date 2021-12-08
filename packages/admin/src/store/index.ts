import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "./loggerMiddleware";
import { viewSlice } from "./viewSlice";

export const store = configureStore({
  reducer: {
    view: viewSlice.reducer,
  },
  middleware: new MiddlewareArray().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
