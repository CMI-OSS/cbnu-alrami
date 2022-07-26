import { Calendar, Food, Home, Map, Speaker } from "../../atoms/icon";
import NavigationLink from "../../atoms/NavigationLink";
import $ from "./style.module.scss";

function Footer() {
  const routes = [
    {
      id: 1,
      icon: Speaker,
      label: "공지",
      to: "/notice",
    },
    {
      id: 2,
      icon: Calendar,
      label: "일정",
      to: "/calendar",
    },
    {
      id: 3,
      icon: Home,
      label: "홈",
      to: "/home",
    },
    {
      id: 4,
      icon: Food,
      label: "식단",
      to: "/cafeteria",
    },
    {
      id: 5,
      icon: Map,
      label: "캠퍼스맵",
      to: "/map",
    },
  ];

  return (
    <footer className={$.footer}>
      {routes.map((route) => {
        return <NavigationLink key={route.id} route={route} />;
      })}
    </footer>
  );
}

export default Footer;
