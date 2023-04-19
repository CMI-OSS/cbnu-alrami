import useSwipe from "@hooks/useSwipe";
import ErrorFallbackWithStyle from "src/components/atoms/ErrorFallbackWithStyle";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import MenuList from "src/components/molecules/MenuList";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import { CAFETERIA_LIST } from "src/consts";

import CafeteriaBody from "./CafateriaBody";
import { useCafeteria } from "./hooks";
import $ from "./style.module.scss";

const height = "calc(var(--vh, 1vh) * 100)";

function Cafeteria() {
  const {
    year,
    month,
    date,
    day,
    fullDate,
    selectedMenu,
    onDecrease,
    onIncrease,
    handleMenu,
  } = useCafeteria();
  const swipeRef = useSwipe();

  return (
    <section ref={swipeRef}>
      <header className={$.header}>
        <CalendarHeader
          calendar={{ ...{ year, month, date, day } }}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
        <MenuList
          menuList={CAFETERIA_LIST}
          onClick={handleMenu}
          clickedMenu={selectedMenu}
        />
      </header>

      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height={height} />}
        errorFallback={ErrorFallbackWithStyle({ height })}
        keys={[ fullDate, selectedMenu ]}
      >
        <CafeteriaBody {...{ fullDate, selectedMenu }} />
      </AsyncBoundary>

      <Footer />
    </section>
  );
}

export default Cafeteria;
