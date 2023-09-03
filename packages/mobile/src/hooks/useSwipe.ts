import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Hammer from "hammerjs";

const useSwipe = () => {
  const navigate = useNavigate();
  const swipeRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (e: HammerInput) => {
    const isSwiperImage = e.target.dataset.id === "swiper-image";
    if (isSwiperImage) return;
    if (e.direction === Hammer.DIRECTION_RIGHT) {
      navigate(-1);
    }
    if (e.direction === Hammer.DIRECTION_LEFT) {
      navigate(1);
    }
  };

  useEffect(() => {
    if (!swipeRef || !swipeRef.current) return;
    const swipeHandler = new Hammer(swipeRef.current, {
      cssProps: {
        userSelect: "true",
      },
    });

    swipeHandler.on("swiperight", handleSwipe);
    swipeHandler.on("swipeleft", handleSwipe);

    // eslint-disable-next-line consistent-return
    return () => {
      swipeHandler.off("swiperight", handleSwipe);
      swipeHandler.off("swipeleft", handleSwipe);
    };
  }, []);

  return swipeRef;
};

export default useSwipe;
