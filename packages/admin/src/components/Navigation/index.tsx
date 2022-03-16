import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import cx from "classnames";
import $ from "./style.module.scss";

export default function Natigation() {
  const isLoginMatch = useMatch("/login");
  const [ active, setActive ] = useState(-1);

  const SCRAPER_MENUS = {
    label: "스크래퍼",
    menus: [
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
        path: "/scraper/calendar",
        label: "학사일정",
      },
    ],
  };

  const BOARD_MENUS = {
    label: "게시판",
    menus: [
      {
        path: "/board/list",
        label: "게시물 목록",
      },
      {
        path: "/board/write",
        label: "게시물 작성",
      },
    ],
  };

  return isLoginMatch ? (
    <></>
  ) : (
    <nav className={$.navigation}>
      <ul className={$["outer-ul"]}>
        <li className={$.logo}>CMI</li>
        <ul>
          {[ BOARD_MENUS, SCRAPER_MENUS ].map((menu, idx) => (
            <li key={`${menu}`}>
              <p>{menu.label}</p>
              <ul className={idx === active ? $["list-activated"] : ""}>
                {menu.menus.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setActive(idx)}
                    className={({ isActive }) => {
                      return cx(
                        $["nav-link"],
                        isActive ? $["page-activated"] : "",
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
