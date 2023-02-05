import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Navigate } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HeadMeta from "@components/atoms/HeadMeta";
import DeepLink from "src/page/Notice/Detail/DeepLink";
import Subscription from "src/page/Subscription";
import { isStaging, isWebView } from "src/utils/webview";

import useWindowSizeDetect from "./hooks/useWindowSizeDetect";
import "./mobile.scss";
import Cafeteria from "./page/Cafeteria";
import Calendar from "./page/Calendar";
import Home from "./page/Home";
import Map from "./page/Map";
import MapDetail from "./page/Map/Detail";
import Notice from "./page/Notice";
import NoticeDetail from "./page/Notice/Detail";
import PlaceDetail from "./page/Place/Detail";
import Error from "./page/Place/Error";
import MoreImage from "./page/Place/MoreImage";
import Report from "./page/Place/Report";
import SettingRoute from "./page/Setting";
import Preview from "./page/Subscription/Preview";

function App() {
  const [ uuid, setUuid ] = useState("");
  const [ _, height ] = useWindowSizeDetect();

  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    if (isAndroid || isIOS) {
      setUuid(JSON.stringify(localStorage.getItem("token")));
    }
  }, []);

  useEffect(() => {
    setScreenSize();
  }, [ height ]);

  const appRoutes = [
    { path: "/notice", element: <Notice /> },
    { path: "/notice/:articleId", element: <NoticeDetail /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/home", element: <Home /> },
    { path: "/cafeteria", element: <Cafeteria /> },
    { path: "/map", element: <Map /> },
    { path: "/subscription", element: <Subscription /> },
    { path: "/subscription/setting", element: <Subscription /> },
    { path: "/preview", element: <Preview /> },
    {
      path: "/place",
      element: <PlaceDetail />,
    },
    { path: "/place/report", element: <Report /> },
    { path: "/place/error", element: <Error /> },
    { path: "/place/more", element: <MoreImage /> },
    { path: "/school", element: <MapDetail /> },
    { path: "/setting/*", element: <SettingRoute /> },
    { path: "/*", element: <Navigate replace to="/home" /> },
  ];
  const webRoutes = [ { path: "/notice/:articleId", element: <NoticeDetail /> } ];

  const mode = import.meta.env.MODE;
  const routes = isStaging && !isWebView ? webRoutes : appRoutes;

  return (
    <BrowserRouter>
      {mode === "production" && !isWebView && <DeepLink />}
      <HeadMeta title="충림이" />
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
