import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScraperPage from "src/pages/ScraperPage";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import useSocket from "src/hooks/useSocket";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/Login";
import BoardPage from "./pages/BoardPage";
import { store } from "./store";
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
