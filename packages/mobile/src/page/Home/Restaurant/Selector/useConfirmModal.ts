import { useState } from "react";

import { Restaurant } from "src/type";

type OnCafeteriaSelect = (name: Restaurant) => void;

function useConfirmModal(onCafeteriaSelect: OnCafeteriaSelect) {
  const [ isConfirmOpen, setIsConfirmOpen ] = useState(false);

  const handleSelect = (name: Restaurant) => {
    if (name === "표시 안함") {
      setIsConfirmOpen(true);
      return;
    }
    onCafeteriaSelect(name);
  };

  const handleCloseModalClick = () => {
    return setIsConfirmOpen(false);
  };

  const handleAgreeClick = () => {
    return onCafeteriaSelect("표시 안함");
  };

  return {
    isConfirmOpen,
    handleSelect,
    handleCloseModalClick,
    handleAgreeClick,
  };
}

export default useConfirmModal;
