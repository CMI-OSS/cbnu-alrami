import { Scrapers } from "@admin/store/scraperEnum";
import { useAppDispatch, useAppSelector } from "@admin/store";
import { setScraper, view } from "@admin/store/viewSlice";
import { cx } from "@emotion/css";
import getStyle from "./style";

export default function Natigation() {
  const { scraper } = useAppSelector(view);
  const dispatch = useAppDispatch();

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
              onClick={() => dispatch(setScraper(item))}
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
