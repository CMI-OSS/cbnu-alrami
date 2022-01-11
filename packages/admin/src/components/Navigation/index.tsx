import { NavLink } from "react-router-dom";
import getStyle from "./style";

export default function Natigation() {
  const style = getStyle();
  const MENUS = [
    {
      path: "/scraper/notice",
      label: "공지사항",
    },
    {
      path: "/scraper/student",
      label: "학생 식당",
    },
    {
      path: "/scraper/domitory",
      label: "기숙사 식당",
    },
    {
      path: "/scraper/schedule",
      label: "학사일정",
    },
  ];

  return (
    <nav className={style.Navigation}>
      <ul className={style.sideNavUl}>
        <li className={style.logo}>CMI</li>
        {MENUS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({isActive}) => style.sideNavLi + (isActive? ` ${style.activated}` : "")}
          >
            {label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
