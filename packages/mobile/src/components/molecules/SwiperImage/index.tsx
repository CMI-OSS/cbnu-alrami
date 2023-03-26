import { useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";

import { Arrow } from "@components/atoms/icon";
import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  imageDatas: string[];
  onOpen?: () => void;
  order: number;
  setOrder: (prev: number) => void;
} & DefaultProps;

function SwiperImage({
  imageDatas,
  onOpen,
  order,
  setOrder,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const images = [
    imageDatas[imageDatas?.length - 1],
    ...imageDatas,
    imageDatas[0],
  ];

  const total = images.length;
  const totals = Array.from({ length: total - 2 }, (_, i) => {
    return i + 1;
  });
  const [ touch, setTouch ] = useState({
    start: 0,
    end: 0,
  });
  const [ style, setStyle ] = useState({
    transform: `translateX(-${order}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  useEffect(() => {
    if (order === 0) {
      setOrder(total - 2);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${total - 2}00%)`,
          transition: "0ms",
        });
      }, 500);
    }

    if (order >= total - 1) {
      setOrder(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${1}00%)`,
          transition: "0ms",
        });
      }, 500);
    }
  }, [ order, total ]);

  const prevSlide = () => {
    if (order === 0) {
      return;
    }
    setOrder(order - 1);
    setStyle({
      ...style,
      transform: `translateX(-${order - 1}00%)`,
    });
  };
  const nextSlide = () => {
    if (order === total - 1) {
      return;
    }
    setOrder(order + 1);
    setStyle({
      ...style,
      transform: `translateX(-${order + 1}00%)`,
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouch({
      ...touch,
      start: e.touches[0].pageX,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (ref?.current) {
      const current = ref.current.clientWidth * order;
      const result = -current + (e.targetTouches[0].pageX - touch.start);
      setStyle({
        transform: `translate3d(${result}px, 0px, 0px)`,
        transition: "0ms",
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const end = e.changedTouches[0].pageX;
    if (touch.start === end) {
      return;
    }
    if (touch.start > end) {
      nextSlide();
    } else {
      prevSlide();
    }
    setTouch({
      ...touch,
      end,
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={classnames($["swiper-image"], className)} onClick={onOpen}>
      <div className={$.order}>
        {order}/{total - 2}
      </div>
      <div
        className={$.images}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={$["images-wrapper"]} ref={ref} style={style}>
          {images.map((image, index) => {
            return (
              <img
                className={$.image}
                key={`${image + index}`}
                src={image}
                alt="충림이 이미지"
              />
            );
          })}
        </div>
        {isDesktop && (
          <div className={$.buttons}>
            <button className={$.left} onClick={prevSlide} type="button">
              <Arrow size={6} />
            </button>
            <button className={$.right} onClick={nextSlide} type="button">
              <Arrow size={6} />
            </button>
          </div>
        )}
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

export default SwiperImage;
