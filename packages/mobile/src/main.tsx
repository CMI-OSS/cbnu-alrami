import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

import Toast from "@components/atoms/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { persistor, store } from "./store";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <HelmetProvider>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <Toast />
          </PersistGate>
        </HelmetProvider>
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>,
);
