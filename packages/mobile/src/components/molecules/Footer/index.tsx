import NavigationLink from "../../atoms/NavigationLink";
import $ from "./style.module.scss";

function Footer() {
  const routes = [
    {
      id: 1,
      icon: "home",
      label: "홈",
      to: "/home",
    },
    {
      id: 2,
      icon: "calendar",
      label: "일정",
      to: "/calendar",
    },
    {
      id: 3,
      icon: "notice",
      label: "공지사항",
      to: "/article",
    },
    {
      id: 4,
      icon: "diet",
      label: "식단",
      to: "/cafeteria",
    },
    {
      id: 5,
      icon: "map",
      label: "캠퍼스맵",
      to: "/map",
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
