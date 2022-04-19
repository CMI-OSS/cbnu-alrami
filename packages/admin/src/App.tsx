import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import useSocket from "src/hooks/useSocket";
import ScraperPage from "src/pages/ScraperPage";

import Navigation from "./components/Navigation";
import AdminManagementPage from "./pages/AdminManagementPage";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/Login";
import { store } from "./store";
import "@shared/styles/global.scss";
import "./admin.scss";

function App() {
  useSocket();

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/board/*" element={<BoardPage />} />
          <Route path="/scraper/*" element={<ScraperPage />} />
          <Route path="/manage/*" element={<AdminManagementPage />} />
          <Route path="*" element={<Navigate to="/scraper/notice" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ProviderApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default hot(module)(ProviderApp);
