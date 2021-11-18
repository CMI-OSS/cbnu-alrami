import { useContext } from "react";
import { MenuContext, MenuConfig } from "@admin/utils/menuContext";
import { cx } from "@emotion/css";
import getStyle from "./style";

export default function Natigation() {
  const { status, setContext } = useContext(MenuContext);
  const style = getStyle();
  const sidebarMenus = [
    MenuConfig.all,
    MenuConfig.running,
    MenuConfig.waiting,
    MenuConfig.error,
  ];

  return (
    <nav className={style.Navigation}>
      <ul className={style.sideNavUl}>
        <li className={style.logo}>CMI</li>
        {sidebarMenus.map((item) => (
          <li key={item} className={style.sideNavLi}>
            <button
              type="button"
              onClick={() => setContext(item)}
              className={cx(style.insideBtn, {
                [style.activated]: item === status,
              })}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
