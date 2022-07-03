import { useState } from "react";

import classnames from "classnames";
import { FlickingMenu } from "src/type";

import $ from "./style.module.scss";

export default function useFlicking(menuList: FlickingMenu[]) {
  const [ clickedMenu, setClickedMenu ] = useState(1);

  return [
    clickedMenu,
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
            onClick={() => setClickedMenu(idx + 1)}
          >
            {menu.name}
          </button>
        );
      })}
    </div>,
  ];
}
