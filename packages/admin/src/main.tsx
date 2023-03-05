import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { apiServer } from "@shared/constant";
import { OpenAPI } from "@shared/swagger-api/generated/core/OpenAPI";
import { RecoilRoot } from "recoil";

import App from "./App";

const queryClient = new QueryClient();
OpenAPI.BASE = apiServer.dev;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>,
);
