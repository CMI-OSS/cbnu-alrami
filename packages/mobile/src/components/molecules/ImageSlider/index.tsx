import { useRef, useState } from "react";

import classnames from "classnames";
import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  total: number;
  order: number;
  setOrder: (prev: number) => void;
} & DefaultProps;

function ImageSlider({ total, order, setOrder, className, children }: Props) {
  const { innerWidth } = window;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [ prevScrollLeft, setPrevScrollLeft ] = useState<number>(0);
  const totals = Array.from({ length: total }, (_, i) => {
    return i;
  });

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }
    const halfInnerWidth = innerWidth / 2;
    const { scrollLeft } = sliderRef.current;
    const direction = scrollLeft > prevScrollLeft ? "RIGHT" : "LEFT";
    if (direction === "RIGHT") {
      if (scrollLeft > order * innerWidth + halfInnerWidth) {
        setOrder(order + 1);
      }
    } else if (direction === "LEFT") {
      if (scrollLeft < order * innerWidth - halfInnerWidth) {
        setOrder(order - 1);
      }
    }
    setPrevScrollLeft(scrollLeft);
  };

  return (
    <div className={$["image-slider-wrapper"]}>
      <div className={$.order}>
        {order + 1}/{total}
      </div>
      <div
        className={classnames($["image-slider"], className)}
        onScroll={handleScroll}
        ref={sliderRef}
      >
        {children}
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

export default ImageSlider;
