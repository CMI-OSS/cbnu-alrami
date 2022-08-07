import { useReducer } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";
import dayjs from "dayjs";
import { cafeteriaList, cafeteriaMenu } from "src/__mocks__";
import noMenu from "src/assets/no_menu.png";
import { Arrow } from "src/components/atoms/icon/Arrow";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import useFlicking from "src/hooks/useFlicking";
import { cafeteriaTime } from "src/utils/cafeteriaTime";

import caledarReducer from "../Calendar/calendarReducer";
import $ from "./style.module.scss";

function Cafeteria() {
  const [ clickedMenu, Flicking ] = useFlicking(cafeteriaList);
  const [ { year, month, date, day }, dispatchDay ] = useReducer(caledarReducer, {
    year: dayjs().year(),
    month: dayjs().month(),
    date: dayjs().date(),
    day: dayjs().day(),
  });

  return (
    <>
      <header className={$.header}>
        <CalendarHeader
          calendar={{ ...{ year, month, date, day } }}
          onDecrease={() => {
            return dispatchDay({ type: "decrement_date" });
          }}
          onIncrease={() => {
            return dispatchDay({ type: "increment_date" });
          }}
        />
      </header>

      {Flicking}
      <main
        className={classnames($.cafeteria, {
          [$["no-menu"]]: !cafeteriaMenu.length,
        })}
      >
        {cafeteriaMenu.length > 0 ? (
          <>
            {cafeteriaMenu.map(({ id, content, calory, time }) => {
              const [ mealTime, timeInfo ] = cafeteriaTime(id, time);
              return (
                <CafeteriaMenuCard
                  key={content}
                  {...{ mealTime, timeInfo, calory }}
                  mealMenu={content}
                />
              );
            })}
            <div className={$["go-out"]}>
              <span>다른 메뉴가 먹고싶다면?</span>
              <Link to="/place/food" className={$["go-out-link"]}>
                나가서 먹기
                <Arrow width={3} height={19} color="#A3B9D6" />
              </Link>
            </div>
          </>
        ) : (
          <div className={$["go-out"]}>
            <img src={noMenu} alt="메뉴가 없습니다." width="130" height="130" />
            <span>오늘은 식단이 없어요</span>
            <Link to="/place/food" className={$["go-out-link"]}>
              대신 나가서 먹기
              <Arrow width={3} height={19} color="#A3B9D6" />
            </Link>
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Cafeteria;
