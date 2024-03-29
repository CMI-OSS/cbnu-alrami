import * as icons from "@components/atoms/icon/svg";

import NavigationLink from "../../atoms/NavigationLink";
import $ from "./style.module.scss";

function Footer() {
  const routes: {
    icon: keyof typeof icons;
    label: string;
    to: string;
  }[] = [
    {
      icon: "home",
      label: "홈",
      to: "/home",
    },
    {
      icon: "calendar",
      label: "일정",
      to: "/calendar",
    },
    {
      icon: "notice",
      label: "공지사항",
      to: "/article/subscribe",
    },
    {
      icon: "diet",
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
            key={route.icon}
            route={route}
          />
        );
      })}
    </footer>
  );
}

export default Footer;
