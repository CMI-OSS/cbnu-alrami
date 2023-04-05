import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import boardReducer from "./boardSlice";
import cafeteriaReducer from "./cafeteriaSlice";
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
  cafeteria: cafeteriaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    statusReducer,
    boardReducer,
    placeReducer,
    settingReducer,
    cafeteriaReducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
