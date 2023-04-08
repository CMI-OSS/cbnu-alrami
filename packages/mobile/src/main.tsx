import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import Toast from "@components/atoms/Toast";
import { setOpenApiBase } from "@shared/util";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import { staleTime } from "src/consts/react-query/staleTime";

import App from "./App";
import { persistor, store } from "./store";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: staleTime.DEFAULT,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toast />
        </PersistGate>
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>,
);

setOpenApiBase();
