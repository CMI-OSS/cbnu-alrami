import { NavLink } from "react-router-dom";
import $ from "./style.module.scss";
import { Calendar, Food, Home, Map, Speaker } from "../icon";

function Footer() {
  const routes = [
    {
      icon: Speaker,
      label: "공지",
      to: "notification",
    },
    {
      icon: Calendar,
      label: "일정",
      to: "calendar",
    },
    {
      icon: Home,
      label: "홈",
      to: "home",
    },
    {
      icon: Food,
      label: "식단",
      to: "cafeteria",
    },
    {
      icon: Map,
      label: "캠퍼스맵",
      to: "map",
    },
  ];

  return (
    <footer className={$.footer}>
      {routes.map((route) => {
        return (
          <NavLink
            to={route.to}
            className={({ isActive }) => (isActive ? $.active : "")}
          >
            <route.icon />
            <p>{route.label}</p>
          </NavLink>
        );
      })}
    </footer>
  );
}

export default Footer;
