import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { setOpenApiBase } from "@shared/util";
import { RecoilRoot } from "recoil";

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>,
);

setOpenApiBase();
