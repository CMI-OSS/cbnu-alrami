import { useContext } from "react";
import { ScrapperConfig, ScrapperContext } from "@admin/utils/scrapperContext";
import { cx } from "@emotion/css";
import getStyle from "./style";

export default function Natigation() {
  const { scrapper, setScrapper } = useContext(ScrapperContext);
  const { notice, studentRestaurant, domitoryRestaurant, collegeSchedule } =
    ScrapperConfig;
  const style = getStyle();
  const sidebarItems = [
    notice,
    studentRestaurant,
    domitoryRestaurant,
    collegeSchedule,
  ];

  return (
    <nav className={style.Navigation}>
      <ul className={style.sideNavUl}>
        <li className={style.logo}>CMI</li>
        {sidebarItems.map((item) => (
          <li key={item} className={style.sideNavLi}>
            <button
              type="button"
              onClick={() => setScrapper(item)}
              className={cx(style.insideBtn, {
                [style.activated]: item === scrapper,
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
