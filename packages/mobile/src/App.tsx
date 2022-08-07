import { Navigate } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Preview from "src/page/Subscription/Preview";
import Subscription from "src/page/Subscription/Start";

import "./mobile.scss";
import Cafeteria from "./page/Cafeteria";
import Calendar from "./page/Calendar";
import Home from "./page/Home";
import Map from "./page/Map";
import MapDetail from "./page/Map/Detail";
import MoreImage from "./page/Map/MoreImage";
import Notice from "./page/Notice";
import PlaceDetail from "./page/Place/Detail";
import Error from "./page/Place/Error";
import Report from "./page/Place/Report";
import SettingRoute from "./page/Setting";
import College from "./page/Subscription/College";
import End from "./page/Subscription/End";
import Major from "./page/Subscription/Major";
import SubscriptionSetting from "./page/Subscription/Setting";

function App() {
  const routes = [
    { path: "/notice", element: <Notice /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/home", element: <Home /> },
    { path: "/cafeteria", element: <Cafeteria /> },
    { path: "/map", element: <Map /> },
    // TODO: more 라우팅 서브로 넣어야 함
    { path: "/more", element: <MoreImage /> },
    { path: "/subscription", element: <Subscription /> },
    { path: "/subscription/setting", element: <SubscriptionSetting /> },
    { path: "/subscription/common", element: <End /> },
    { path: "/subscription/common/:detailId", element: <Preview /> },
    { path: "/subscription/major", element: <College /> },
    {
      path: "/subscription/major/:collegeId",
      element: <Major />,
    },
    {
      path: "/subscription/major/:collegeId/:majorId",
      element: <End />,
    },
    {
      path: "/subscription/major/:collegeId/:majorId/:detailId",
      element: <Preview />,
    },
    {
      path: "/place",
      element: <PlaceDetail />,
    },
    { path: "/place/report", element: <Report /> },
    { path: "/place/error", element: <Error /> },
    { path: "/setting/*", element: <SettingRoute /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
        <Route path="*" element={<Navigate replace to="/home" />} />
        <Route path="/place/:name/detail/:id" element={<MapDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
