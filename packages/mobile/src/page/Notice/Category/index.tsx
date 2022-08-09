import { NavLink } from "react-router-dom";

import { Star } from "@components/atoms/icon";
import classNames from "classnames";
import { useSubscribeBoards } from "src/api/subscribe";

import $ from "./style.module.scss";

function Category() {
  const { data: categoryData } = useSubscribeBoards();
  
  return (
    <div className={$.categories}>
      <NavLink
        className={({ isActive }) => {
          return classNames($.category, { [$.active]: isActive });
        }}
        to="?major=즐겨찾기"
      >
        <Star size={12} stroke="#5e5e5e" fill="#5e5e5e" />
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

      {categoryData?.data.map((category) => {
        return (
          <NavLink
            key={category.id}
            to={`?major=${category.name}`}
            className={({ isActive }) => {
              return classNames($.category, { [$.active]: isActive });
            }}
          >
            {category.parents.length
              ? `${category.parents[0]?.name} - ${category.name}`
              : category.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Category;
