import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Global } from "@emotion/react";
import ScraperPage from "src/pages/ScraperPage";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import getGlobalStyle from "@shared/styles/globalStyle";
import getAdminStyle from "src/adminStyle";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/Login";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Global styles={getGlobalStyle()} />
      <Global styles={getAdminStyle()} />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/scraper/*" element={<ScraperPage />} />
          <Route path="*" element={<Navigate to="/scraper/notice" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default hot(module)(App);
