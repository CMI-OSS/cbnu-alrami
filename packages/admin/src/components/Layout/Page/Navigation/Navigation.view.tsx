import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";

import { Admin } from "@shared/swagger-api/generated/models/Admin";
import classnames from "classnames";
import { useRecoilValue } from "recoil";
import { adminSelector } from "src/store/admin.selector";

import $ from "./Navigation.module.scss";

const ARTICLE_MENUS = {
  label: "게시물",
  menus: [
    {
      path: "/article",
      label: "게시물 목록",
    },
    {
      path: "/article/write",
      label: "게시물 작성",
    },
  ],
};

const BOARD_MENUS = {
  label: "게시판",
  menus: [
    {
      path: "/board",
      label: "게시판 목록",
    },
    {
      path: "/board/new",
      label: "게시판 추가",
    },
  ],
};

const ADMIN_MANAGE_MENUS = {
  label: "관리자 관리",
  menus: [
    {
      path: "/admin/add",
      label: "관리자 추가",
    },
    {
      path: "/admin/list",
      label: "관리자 목록",
    },
  ],
};
const PLACE_MANAGE_MENUS = {
  label: "건물 관리",
  menus: [
    {
      path: "/place/add",
      label: "건물 추가",
    },
    {
      path: "/place/list",
      label: "건물 목록",
    },
  ],
};

export default function Navigation() {
  const isLoginMatch = useMatch("/login");
  const [ active, setActive ] = useState(-1);
  const admin = useRecoilValue(adminSelector);

  const navMenus =
    admin.authoirty === Admin.authoirty.SUPER
      ? [ ARTICLE_MENUS, BOARD_MENUS, ADMIN_MANAGE_MENUS, PLACE_MANAGE_MENUS ]
      : [ ARTICLE_MENUS ];

  return isLoginMatch ? (
    <></>
  ) : (
    <nav className={$.navigation}>
      <div className={$.nickname}>
        {admin.nickname} 님<br />
      </div>
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
                        end
                        className={({ isActive }) => {
                          return classnames(
                            $["nav-link"],
                            isActive ? $["page-activated"] : "",
                          );
                        }}
                      >
                        {label}
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
