import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Article from "src/page/Article";
import ArticleDetail from "src/page/Article/Detail";
import Board from "src/page/Board";
import BoardArticle from "src/page/Board/Article";
import { isStaging, isWebView } from "src/utils/webview";

import "src/polyfills";
import useFCMToken from "./hooks/useFCMToken";
import useWindowSizeDetect from "./hooks/useWindowSizeDetect";
import "./mobile.scss";
import Cafeteria from "./page/Cafeteria";
import Calendar from "./page/Calendar";
import Home from "./page/Home";
import Map from "./page/Map";
import MapDetail from "./page/Map/Detail";
import PlaceDetail from "./page/Place/Detail";
import Error from "./page/Place/Error";
import MoreImage from "./page/Place/MoreImage";
import Report from "./page/Place/Report";
import SettingRoute from "./page/Setting";

function App() {
  const [ _, height ] = useWindowSizeDetect();

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  }, [ height ]);

  useFCMToken();

  const appRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/article/*", element: <Article /> },
    { path: "/article/detail/:articleId", element: <ArticleDetail /> },
    { path: "/board/*", element: <Board /> },
    { path: "/board/article/*", element: <BoardArticle /> },
    { path: "/cafeteria", element: <Cafeteria /> },
    { path: "/map", element: <Map /> },
    {
      path: "/place",
      element: <PlaceDetail />,
    },
    { path: "/place/report", element: <Report /> },
    { path: "/place/error", element: <Error /> },
    { path: "/place/more", element: <MoreImage /> },
    { path: "/school", element: <MapDetail /> },
    { path: "/setting/*", element: <SettingRoute /> },
    { path: "/*", element: <Home /> },
  ];

  const webRoutes = [
    { path: "/article/detail/:articleId", element: <ArticleDetail /> },
  ];

  const mode = import.meta.env.MODE;
  const routes = isStaging && !isWebView ? webRoutes : appRoutes;

  return (
    <BrowserRouter>
      {/* {mode === "production" && !isWebView && <>딥링크</>} */}
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
