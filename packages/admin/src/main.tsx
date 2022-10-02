import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { RecoilRoot } from "recoil";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>,
);
