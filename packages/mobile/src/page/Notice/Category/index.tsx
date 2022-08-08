import { NavLink } from "react-router-dom";

import { Star } from "@components/atoms/icon";
import classNames from "classnames";
import { mockCategory } from "src/__mocks__";

import $ from "./style.module.scss";

function Category() {
  return (
    <div className={$.categories}>
      <NavLink
        className={({ isActive }) => {
          return classNames($.category, { [$.active]: isActive });
        }}
        to="?major=즐겨찾기"
      >
        <Star className={$.star} width="12" height="12" color="#5E5E5E" />
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return classNames($.category, { [$.active]: isActive });
        }}
        to="?major=최신"
      >
        최신
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return classNames($.category, { [$.active]: isActive });
        }}
        to="?major=인기"
      >
        인기
      </NavLink>

      {mockCategory.map((category) => {
        return (
          <NavLink
            to={category.to}
            className={({ isActive }) => {
              return classNames($.category, { [$.active]: isActive });
            }}
          >
            {category.major}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Category;
