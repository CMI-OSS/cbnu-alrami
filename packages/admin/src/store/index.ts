import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "./loggerMiddleware";
import { noticeSlice } from "./noticeSlice";

export const store = configureStore({
  // composeWithDevtools, thunk 자동 활성화
  reducer: {
    // 리듀서 정의
    notice: noticeSlice.reducer,
  },
  middleware: new MiddlewareArray().concat(logger), // logger 미들웨어 추가
  devTools: process.env.NODE_ENV !== "production",
});

// store 스스로 루트상태, 앱디스패치 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // 디스패치 타입 정의
export const useAppDispatch = () => useDispatch<AppDispatch>(); // useDispatch를 import하고 타입을 정의하여 새로운 훅을 export
