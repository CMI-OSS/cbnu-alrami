import { useContext } from "react";
import { Scrapers, ScraperContext } from "@admin/utils/scraperContext";
import { cx } from "@emotion/css";
import getStyle from "./style";

export default function Natigation() {
  const { scraper, setScraper } = useContext(ScraperContext);
  const style = getStyle();
  const sidebarMenus = [
    Scrapers.Notice,
    Scrapers.StudentRestaurant,
    Scrapers.DomitoryRestaurant,
    Scrapers.CollegeSchedule,
  ];

  return (
    <nav className={style.Navigation}>
      <ul className={style.sideNavUl}>
        <li className={style.logo}>CMI</li>
        {sidebarMenus.map((item) => (
          <li key={item} className={style.sideNavLi}>
            <button
              type="button"
              onClick={() => setScraper(item)}
              className={cx(style.insideBtn, {
                [style.activated]: item === scraper,
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
