import "@shared/styles/global.scss";
import { hot } from "react-hot-loader";
import { Navigate } from "react-router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cafeteria from "./components/Cafeteria";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import Map from "./components/Map";
import Notification from "./components/Notification";
import Footer from "./components/shared/Footer";
import DefaultPageTemplate from "./components/shared/DefaultPageTemplate";

function App() {
  const routes = [
    { id: 1, path: "/notification", element: <Notification /> },
    { id: 2, path: "/calendar", element: <Calendar /> },
    { id: 3, path: "/home", element: <Home /> },
    { id: 4, path: "/cafeteria", element: <Cafeteria /> },
    { id: 5, path: "/map", element: <Map /> },
  ];

  return (
    <DefaultPageTemplate>
      <BrowserRouter>
        <Footer />
        <Routes>
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </BrowserRouter>
    </DefaultPageTemplate>
  );
}

export default hot(module)(App);
