import classnames from "classnames";
import { Menu } from "src/type";

import $ from "./style.module.scss";

interface Props {
  menuList: Menu[];
  onClick: (id: number) => void;
  clickedMenu: number;
}

export default function MenuList({ menuList, onClick, clickedMenu }: Props) {
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
              return onClick(idx + 1);
            }}
          >
            {menu.name}
          </button>
        );
      })}
    </div>
  );
}
