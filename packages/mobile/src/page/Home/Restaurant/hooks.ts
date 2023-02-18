import { useEffect, useState } from "react";

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

type SelectorItems =
  | "greeting"
  | "selector"
  | "selected"
  | "none"
  | "finalGuide";

export const useRestaurant = () => {
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
    const isShowCafeteriaGuide = getShowCafeteriaSelectGuide();
    if (isShowCafeteriaGuide === null) setShowCafeteriaSelectGuide();
    if (getShowCafeteriaSelectFinalGuide() === null)
      setShowCafeteriaSelectFinalGuide();
    if (isShowCafeteriaGuide === "true") {
      setCardType("greeting");
      return;
    }
    if (cafeteriaName === "표시 안함") {
      setCardType("none");
      return;
    }
    setCardType("selected");
  }, []);

  return {
    cardType,
    cafeteriaName,
    handleSelectorClick,
    handleSelectorCancel,
    handleCafeteriaSelect,
    handleFinalGuideCancel,
  };
};
