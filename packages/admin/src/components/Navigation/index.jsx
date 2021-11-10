import { useContext } from "react";
import { menuContext, sidebarMenus } from "@admin/utils/menuContext";
import { cx } from "@emotion/css";
import getStyle from "./style";

export default function Natigation() {
  const { status, setContext } = useContext(menuContext);
  const { Navigation, activated, sideNavUl, sideNavLi, logo, insideBtn } =
    getStyle();

  return (
    <nav className={Navigation}>
      <ul className={sideNavUl}>
        <li className={logo}>CMI</li>
        {sidebarMenus.map((item) => (
          <li key={item} className={sideNavLi}>
            <button
              type="button"
              onClick={() => setContext(item)}
              className={cx(insideBtn, item === status ? activated : "")}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
