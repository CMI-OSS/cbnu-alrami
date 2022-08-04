import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import placeReducer from "./placeSlice";
import settingReducer from "./settingSlice";
import statusReducer from "./statusSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  place: placeReducer,
  status: statusReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    statusReducer,
    placeReducer,
    settingReducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
