import "./mobile.scss";
import { Provider } from "react-redux";
import { Navigate } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import queryString from "query-string";

import Cafeteria from "./page/Cafeteria";
import Calendar from "./page/Calendar";
import Home from "./page/Home";
import Map from "./page/Map";
import Notification from "./page/Notification";
import Place from "./page/Place";
import { store } from "./store";

function App() {
  const routes = [
    { id: 1, path: "/notification", element: <Notification /> },
    { id: 2, path: "/calendar", element: <Calendar /> },
    { id: 3, path: "/home", element: <Home /> },
    { id: 4, path: "/cafeteria", element: <Cafeteria /> },
    { id: 5, path: "/map", element: <Map /> },
    { id: 6, path: "/place", element: <Place /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </BrowserRouter>
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
