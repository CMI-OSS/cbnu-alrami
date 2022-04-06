import { useEffect, useState } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import classnames from "classnames";
import { useAppSelector } from "src/store";
import $ from "./style.module.scss";

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

export default function Navigation() {
  const isLoginMatch = useMatch("/login");
  const { pathname } = useLocation();
  const [ active, setActive ] = useState(-1);
  const boardState = useAppSelector((state) => state.boardReducer.board.write);
  const navMenus = [ BOARD_MENUS, SCRAPER_MENUS ];

  useEffect(() => {
    navMenus.forEach(({ menus }, idx) =>
      menus.forEach(({ path }) => {
        if (pathname === path) setActive(idx);
      }),
    );
  }, []);

  return isLoginMatch ? (
    <></>
  ) : (
    <nav className={$.navigation}>
      <ul className={$["outer-ul"]}>
        <li className={$.logo}>CMI</li>
        <ul>
          {navMenus.map(({ label, menus }, idx) => (
            <li key={`${menus}`}>
              <p>{label}</p>
              <ul className={idx === active ? $["list-activated"] : ""}>
                {menus.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setActive(idx)}
                    className={({ isActive }) => {
                      return classnames(
                        $["nav-link"],
                        isActive ? $["page-activated"] : "",
                      );
                    }}
                  >
                    {label}
                    {label === "게시물 작성" &&
                      Object.values(boardState).some(
                        (x) => x !== "" && x !== "<p><br></p>",
                      ) && <span>(작성중)</span>}
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
