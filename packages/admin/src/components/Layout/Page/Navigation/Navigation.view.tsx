import { useEffect, useState } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";

import classnames from "classnames";
import { useAppSelector } from "src/store";

import $ from "./Navigation.module.scss";

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
const ADMIN_MANAGE_MENUS = {
  label: "관리자 관리",
  menus: [
    {
      path: "/manage/add",
      label: "관리자 추가",
    },
    {
      path: "/manage/list",
      label: "관리자 목록",
    },
  ],
};

export default function Navigation() {
  const isLoginMatch = useMatch("/login");
  const { pathname } = useLocation();
  const [ active, setActive ] = useState(-1);
  const { boardImgList, boardTitle, boardCategory, boardContent } =
    useAppSelector((state) => {
      return state.boardReducer.board.write;
    });
  const boardState = {
    ...{ boardImgList, boardTitle, boardCategory, boardContent },
  };
  const navMenus = [ BOARD_MENUS, SCRAPER_MENUS, ADMIN_MANAGE_MENUS ];

  useEffect(() => {
    navMenus.forEach(({ menus }, idx) => {
      if (
        menus.find(({ path }) => {
          return path === pathname;
        })
      )
        setActive(idx);
    });
  }, []);

  return isLoginMatch ? (
    <></>
  ) : (
    <nav className={$.navigation}>
      <ul className={$["outer-ul"]}>
        {/* <li className={$.logo}>충림이v2 관리자</li> */}
        <ul>
          {navMenus.map(({ label, menus }, idx) => {
            return (
              <li key={label}>
                <p>{label}</p>
                <ul className={idx === active ? $["list-activated"] : ""}>
                  {menus.map(({ path, label }) => {
                    return (
                      <NavLink
                        key={path}
                        to={path}
                        onClick={() => {
                          return setActive(idx);
                        }}
                        className={({ isActive }) => {
                          return classnames(
                            $["nav-link"],
                            isActive ? $["page-activated"] : "",
                          );
                        }}
                      >
                        {label}
                        {label === "게시물 작성" &&
                          Object.values(boardState).some((x) => {
                            return (
                              x !== "" && x !== "<p><br></p>" && x.length !== 0
                            );
                          }) && <span>(작성중)</span>}
                      </NavLink>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </ul>
    </nav>
  );
}
