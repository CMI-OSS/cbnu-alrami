import { NavLink } from "react-router-dom";

import { Star } from "@components/atoms/icon";
import classNames from "classnames";
import { useSubscribeBoards } from "src/api/subscribe";

import $ from "./style.module.scss";

type Props = {
  target: string;
};

function Category({ target }: Props) {
  const { data: categories } = useSubscribeBoards();
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
            key={category.id}
            to={`?type=${category.id}`}
            className={classNames(
              $.category,
              Number(target) === category.id && $.active,
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
