import { useRef, useState } from "react";

import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  total: number;
  order: number;
  setOrder: (prev: number) => void;
} & DefaultProps;

function Slider({ total, order, setOrder, className, children }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [ touchStart, setTouchStart ] = useState(0);
  const totals = Array.from({ length: total }, (_, i) => {
    return i;
  });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) {
      return;
    }
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.touches[0].clientX;
    const halfInnerWidth = window.innerWidth / 2;

    if (touchStart >= halfInnerWidth && touchEnd < halfInnerWidth) {
      if (order + 1 >= total) {
        return;
      }
      setOrder(order + 1);
    }
    if (touchStart <= halfInnerWidth && touchEnd > halfInnerWidth) {
      if (order <= 0) {
        return;
      }
      setOrder(order - 1);
    }
  };

  return (
    <div className={$["slider-container"]}>
      <div className={$.order}>
        {order + 1}/{total}
      </div>
      <div
        className={$["slider-wrapper"]}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          ref={sliderRef}
          className={classNames($.slider, className)}
          style={{ transform: `translateX(${(order + 1) * -100}%)` }}
        >
          {children}
        </div>
      </div>
      <div className={$.total}>
        {totals.map((totalOrder) => {
          return (
            <div
              className={classNames(
                $["total-element"],
                totalOrder === order ? $.same : "",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
