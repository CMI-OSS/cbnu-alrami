/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";

import { Dayjs } from "dayjs";
import { Restaurant as RestaurantType } from "src/type";
import {
  getSelectedCafeteria,
  getShowCafeteriaSelectFinalGuide,
  getShowCafeteriaSelectGuide,
  setSelectedCafeteria,
  setShowCafeteriaSelectFinalGuide,
  setShowCafeteriaSelectGuide,
  unsetShowCafeteriaSelectFinalGuide,
  unsetShowCafeteriaSelectGuide,
} from "src/utils/storage";

import FinalGuide from "./FinalGuide";
import Greeting from "./Greeting";
import Selected from "./Selected";
import Selector from "./Selector";
import $ from "./style.module.scss";

type Props = {
  today: Dayjs;
  isHoliday: boolean;
};

type SelectorItems =
  | "greeting"
  | "selector"
  | "selected"
  | "none"
  | "finalGuide";

function Restaurant({ today, isHoliday }: Props) {
  const [ cardType, setCardType ] = useState<SelectorItems>();
  const [ cafeteriaName, setCafeteriaName ] = useState<RestaurantType>(
    getSelectedCafeteria(),
  );

  const handleSelectorClick = () => {
    setCardType("selector");
  };

  const handleSelectorCancel = () => {
    if (getShowCafeteriaSelectGuide()) {
      if (getSelectedCafeteria() === "표시 안함") {
        setCardType("none");
        return;
      }
      setCardType("selected");
      return;
    }
    setCardType("greeting");
  };

  const handleCafeteriaSelect = (name: RestaurantType) => {
    if (getShowCafeteriaSelectGuide() === "true")
      unsetShowCafeteriaSelectGuide();
    setCafeteriaName(name);
    setSelectedCafeteria(name);
    if (name === "표시 안함") {
      if (getShowCafeteriaSelectFinalGuide() === "true") {
        unsetShowCafeteriaSelectFinalGuide();
        setCardType("finalGuide");
        return;
      }
      setCardType("none");
      return;
    }
    setCardType("selected");
  };

  const handleFinalGuideCancel = () => {
    setShowCafeteriaSelectFinalGuide();
    setCardType("none");
  };

  useEffect(() => {
    if (getShowCafeteriaSelectGuide() === null) setShowCafeteriaSelectGuide();
    if (getShowCafeteriaSelectFinalGuide() === null)
      setShowCafeteriaSelectFinalGuide();
    if (getShowCafeteriaSelectGuide() === "true") {
      setCardType("greeting");
      return;
    }
    if (cafeteriaName === "표시 안함") {
      setCardType("none");
      return;
    }
    setCardType("selected");
  }, []);

  if (cardType === "none") return <></>;
  if (cardType === "greeting")
    return <Greeting onClick={handleSelectorClick} className={$.cafeteria} />;
  if (cardType === "selector")
    return (
      <Selector
        cafeteriaName={cafeteriaName}
        onSelectorCancel={handleSelectorCancel}
        onCafeteriaSelect={handleCafeteriaSelect}
        className={$.cafeteria}
      />
    );
  if (cardType === "finalGuide")
    return (
      <FinalGuide onClick={handleFinalGuideCancel} className={$.cafeteria} />
    );
  return (
    <Selected
      {...{ cafeteriaName, isHoliday, today }}
      onClick={handleSelectorClick}
      className={$.cafeteria}
    />
  );
}

export default Restaurant;
