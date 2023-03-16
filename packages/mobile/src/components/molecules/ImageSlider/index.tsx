/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { useRef, useState } from "react";

import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  onOpen?: () => void;
  total: number;
  order: number;
  setOrder: (prev: number) => void;
} & DefaultProps;

function ImageSlider({
  onOpen,
  total,
  order,
  setOrder,
  className,
  children,
}: Props) {
  console.log("testtest");
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
    const touchEnd = e.changedTouches[0].clientX;
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
    <div
      className={classnames($["slider-container"], className)}
      onClick={onOpen}
    >
      <div className={$.order}>
        {order + 1}/{total}
      </div>
      <div
        className={$["slider-wrapper"]}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchMove}
      >
        <div
          className={$.slider}
          ref={sliderRef}
          style={{ transform: `translateX(${order * -100}%)` }}
        >
          {children}
        </div>
      </div>
      <div className={$.dotdotdot}>
        {totals.map((totalOrder) => {
          return (
            <div
              className={classnames($.dot, totalOrder === order ? $.same : "")}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageSlider;
