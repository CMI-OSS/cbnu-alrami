import { Calendar, Food, Home, Speaker } from "../../atoms/icon";
import NavigationLink from "../../atoms/NavigationLink";
import $ from "./style.module.scss";

function Footer() {
  const routes = [
    {
      id: 1,
      icon: Home,
      label: "홈",
      to: "/home",
    },
    {
      id: 2,
      icon: Calendar,
      label: "일정",
      to: "/calendar",
    },
    {
      id: 3,
      icon: Speaker,
      label: "공지사항",
      to: "/article",
    },
    {
      id: 4,
      icon: Food,
      label: "식단",
      to: "/cafeteria",
    },
  ];

  return (
    <footer className={$.footer}>
      {routes.map((route) => {
        return (
          <NavigationLink
            className={$[`${route.label}`]}
            key={route.id}
            route={route}
          />
        );
      })}
    </footer>
  );
}

export default Footer;
