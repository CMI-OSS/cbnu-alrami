import classnames from "classnames";
import { Menu } from "src/type";

import $ from "./style.module.scss";

type Props<T, U> = {
  menuList: Menu<T, U>[];
  onClick: (id: T) => void;
  clickedMenu: T;
};

function MenuList<T, U>(props: Props<T, U>) {
  const { menuList, onClick: handleClick, clickedMenu } = props;
  return (
    <div className={$["menu-list"]}>
      {menuList.map(({ id, name }) => {
        return (
          <button
            type="button"
            key={`flicking-${id}`}
            className={classnames($.menu, {
              [$["menu-clicked"]]: clickedMenu === id,
              [$["menu-not-clicked"]]: clickedMenu !== id,
            })}
            onClick={() => {
              return handleClick(id);
            }}
          >
            <span className={$["menu-name"]}>{`${name}`}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MenuList;
