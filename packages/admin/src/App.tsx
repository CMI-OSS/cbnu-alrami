import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ScraperPage from "src/pages/Scraper/Scraper.route";

import "./admin.scss";
import AdminManagementPage from "./pages/AdminManagementPage";
import BoardPage from "./pages/BoardPage/Board.route";
import LoginPage from "./pages/Login";
import { store } from "./store";

function App() {
  // useSocket();

  return (
    <>
      <BrowserRouter>
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

export default ProviderApp;
