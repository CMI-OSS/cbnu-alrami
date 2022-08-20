/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";

import { Dayjs } from "dayjs";
import { Restaurant as RestaurantType } from "src/type";
import {
  getFavoriteCafeteria,
  getIsNotFirstUnselect,
  getIsVisited,
  setFavoriteCafeteria,
  setIsNotFirstUnselect,
  setVisited,
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
    getFavoriteCafeteria(),
  );

  const handleSelectorClick = () => {
    setCardType("selector");
  };

  const handleSelectorCancel = () => {
    if (getIsVisited()) {
      if (getFavoriteCafeteria() === "선택안함") {
        setCardType("none");
        return;
      }
      setCardType("selected");
      return;
    }
    setCardType("greeting");
  };

  const handleCafeteriaSelect = (name: RestaurantType) => {
    if (!getIsVisited()) setVisited();
    setCafeteriaName(name);
    setFavoriteCafeteria(name);
    if (name === "선택안함") {
      if (getIsNotFirstUnselect()) {
        setCardType("none");
        return;
      }
      setCardType("finalGuide");
      return;
    }
    setCardType("selected");
  };

  const handleFinalGuideCancel = () => {
    setIsNotFirstUnselect();
    setCardType("none");
  };

  useEffect(() => {
    if (!getIsVisited()) {
      setCardType("greeting");
      return;
    }
    if (cafeteriaName === "선택안함") {
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
