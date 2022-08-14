import classnames from "classnames";
import { Menu } from "src/type";

import $ from "./style.module.scss";

type Props = {
  menuList: Menu[];
  onClick: (id: number) => void;
  clickedMenu: number;
};

function MenuList({ menuList, onClick: handleClick, clickedMenu }: Props) {
  return (
    <div className={$["menu-list"]}>
      {menuList.map((menu, idx) => {
        return (
          <button
            type="button"
            key={`flicking-${menu.id}`}
            className={classnames($.menu, {
              [$["menu-clicked"]]: clickedMenu === idx + 1,
              [$["menu-not-clicked"]]: clickedMenu !== idx + 1,
            })}
            onClick={() => {
              return handleClick(idx + 1);
            }}
          >
            {menu.name}
          </button>
        );
      })}
    </div>
  );
}

export default MenuList;
