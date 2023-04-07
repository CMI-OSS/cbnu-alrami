import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import CalendarHeader from "src/components/molecules/CalendarHeader";
import Footer from "src/components/molecules/Footer";
import MenuList from "src/components/molecules/MenuList";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import { CAFETERIA_LIST } from "src/consts";

import CafeteriaBody from "./CafateriaBody";
import { useCafeteria } from "./hooks";
import $ from "./style.module.scss";

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

  return (
    <>
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
        suspenseFallback={
          <SuspenseFallback height="calc(var(--vh, 1vh) * 100)" />
        }
        errorFallback={ErrorFallback}
        fallBackHeight="calc(var(--vh, 1vh) * 100)"
        keys={[ fullDate, selectedMenu ]}
      >
        <CafeteriaBody day={day || 1} {...{ fullDate, selectedMenu }} />
      </AsyncBoundary>

      <Footer />
    </>
  );
}

export default Cafeteria;
