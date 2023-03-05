import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import ArticelWriteReducer from "src/pages/ArticlePage/ArticleWrite/ArticleWrite.store";
import ImagePreviewReducer from "src/pages/ArticlePage/ArticleWrite/UploadImage/ImagePreview/ImagePreview.store";

import boardReducer from "./boardSlice";
import logger from "./loggerMiddleware";

export const store = configureStore({
  reducer: {
    boardReducer,
    ImagePreviewReducer,
    ArticelWriteReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
