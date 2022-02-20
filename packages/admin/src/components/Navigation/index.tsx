import { cx } from "@emotion/css";
import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import getStyle from "./style";

export default function Natigation() {
  const isLoginMatch = useMatch("/login");
  const [ active, setActive ] = useState(-1);
  const style = getStyle();

  const SCRAPER_MENUS = [
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

  const BOARD_MENUS = [
    {
      path: "/board/list",
      label: "게시물 목록",
    },
    {
      path: "/board/write",
      label: "게시물 작성",
    },
  ];

  return isLoginMatch ? (
    <></>
  ) : (
    <nav className={style.Navigation}>
      <ul className={style.sideNavUl}>
        <li className={style.logo}>CMI</li>
        <ul>
          {[ BOARD_MENUS, SCRAPER_MENUS ].map((menu, idx) => (
            <li className={style.contentNavLi} key={`${menu}`}>
              <p className={style.detailLogo}>{!idx ? "게시판" : "스크래퍼"}</p>
              <ul
                className={cx(style.detailNavUl, {
                  [style.contentsActivated]: idx === active,
                })}
              >
                {menu.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setActive(idx)}
                    className={({ isActive }) => {
                      return (
                        style.sideNavLi +
                        (isActive ? ` ${style.activated}` : "")
                      );
                    }}
                  >
                    {label}
                  </NavLink>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
