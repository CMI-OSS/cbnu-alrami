import { Navigate } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Subscription from "src/page/Subscription/Start";

import "./mobile.scss";
import Cafeteria from "./page/Cafeteria";
import Calendar from "./page/Calendar";
import Home from "./page/Home";
import Map from "./page/Map";
import Call from "./page/Map/Call";
import Detail from "./page/Map/Detail";
import MoreImage from "./page/Map/MoreImage";
import Report from "./page/Map/Report";
import Notification from "./page/Notification";
import Place from "./page/Place";
import College from "./page/Subscription/College";
import End from "./page/Subscription/End";
import Major from "./page/Subscription/Major";

function App() {
  const routes = [
    { id: 1, path: "/notification", element: <Notification /> },
    { id: 2, path: "/calendar", element: <Calendar /> },
    { id: 3, path: "/home", element: <Home /> },
    { id: 4, path: "/cafeteria", element: <Cafeteria /> },
    { id: 5, path: "/map", element: <Map /> },
    { id: 6, path: "/more", element: <MoreImage /> },
    { id: 7, path: "/call", element: <Call /> },
    { id: 8, path: "/error", element: <Report /> },
    { id: 9, path: "/subscription", element: <Subscription /> },
    { id: 10, path: "/subscription/common", element: <End /> },
    { id: 10, path: "/subscription/major", element: <College /> },
    {
      id: 11,
      path: "/subscription/major/:collegeId",
      element: <Major />,
    },
    {
      id: 11,
      path: "/subscription/major/:collegeId/:majorId",
      element: <End />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate replace to="/home" />} />
        <Route path="/place/:name/detail/:id" element={<Detail />} />
        <Route path="/place/*" element={<Place />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
