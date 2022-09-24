import { NavLink } from "react-router-dom";

import { Star } from "@components/atoms/icon";
import { useSubscribeBoardsQuery } from "@hooks/api/subscribe";
import useSearch from "@hooks/useSearch";
import classNames from "classnames";

import $ from "./style.module.scss";

function Category() {
  const target = useSearch({ target: "type" }) || "new";
  const { data: categories } = useSubscribeBoardsQuery();

  return (
    <div className={$.categories}>
      <NavLink
        className={classNames($.category, target === "bookmark" && $.active)}
        to="?type=bookmark"
      >
        <Star size={12} stroke="#5e5e5e" fill="#5e5e5e" />
      </NavLink>
      <NavLink
        className={classNames($.category, target === "new" && $.active)}
        to="?type=new"
      >
        최신
      </NavLink>
      <NavLink
        className={classNames($.category, target === "popular" && $.active)}
        to="?type=popular"
      >
        인기
      </NavLink>
      {categories?.map((category) => {
        return (
          <NavLink
            key={category.boardId}
            to={`?type=${category.boardId}`}
            className={classNames(
              $.category,
              Number(target) === category.boardId && $.active,
            )}
          >
            {category.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Category;
